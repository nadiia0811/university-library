"use client";

import config from "@/lib/config";
import { ImageKitProvider, IKUpload, IKImage, IKVideo } from "imagekitio-next";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { UploadError } from "imagekitio-next/dist/types/components/IKUpload/props";
import Error from "next/error";
import { cn } from "@/lib/utils";

//function for uploading images securely
const authenticator = async () => {
  try {
    //here Next invoke server function GET
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: unknown) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const { publicKey, urlEndpoint } = config.env.imagekit;

interface Props {
  onFileChange: (filePath: string) => void;
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
}

const FileUpload = ({
  onFileChange,
  type,
  accept,
  placeholder,
  folder,
  variant,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-500",
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        //size = 20MB
        toast.error(
          "File size too large. Please upload a file that is less than 20MB"
        );
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error(
          "File size too large. Please upload a file that is less than 50MB"
        );
        return false;
      }
    }
    return true;
  };

  const uploadFileHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (ikUploadRef.current) {
      //@ts-expect-error: Clicking on the ref even though TypeScript can't guarantee it's a valid function
      ikUploadRef.current?.click();
    }
  };

  const onError = (error: UploadError) => {
    console.log(error.message);
    toast.error(`${type} upload failed`);
  };

  const onSuccess = (response: { filePath: string }) => {
    setFile(response);
    onFileChange(response.filePath);
    toast.success(`${type} uploaded successfully`);
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />
      <button
        className={cn("upload-btn", styles.button)}
        onClick={uploadFileHandler}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload button"
          width={32}
          height={32}
          className="object-contain"
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 90 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file && type === "image" ? (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      ) : type === "video" ? (
        <IKVideo
          path={file?.filePath}
          controls={true}
          className="h-96 w-full rounded-xl"
        />
      ) : null}
    </ImageKitProvider>
  );
};

export default FileUpload;
