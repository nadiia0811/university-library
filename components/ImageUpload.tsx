"use client";

import config from "@/lib/config";
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { UploadError } from "imagekitio-next/dist/types/components/IKUpload/props";
import Error from "next/error";

//function for uploading images securely
const authenticator = async () => {
  console.log("Запрос на:", `${config.env.apiEndpoint}/api/auth/imagekit`);
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
    console.log("signature, expire and token: ", { signature, expire, token });
    return { signature, expire, token };
  } catch (error: unknown) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const { publicKey, urlEndpoint } = config.env.imagekit;

type Props = {
  onFileChange: (filePath: string) => void;
};

const ImageUpload = ({ onFileChange }: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

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
    toast.error("Image upload failed");
  };

  const onSuccess = (response: { filePath: string }) => {
    setFile(response);
    onFileChange(response.filePath);
    toast.success("Image uploaded successfully");
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
        fileName="test-upload.png"
      />
      <button className="upload-btn" onClick={uploadFileHandler}>
        <Image
          src="/icons/upload.svg"
          alt="upload button"
          width={32}
          height={32}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
