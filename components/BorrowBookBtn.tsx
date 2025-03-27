"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/borrowBook";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBookBtn = ({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast.error("You are not elegible to borrow this book");
      return;
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast.success("Book borrowed successful");
        router.push("/my-profile");
      } else {
        toast.error("An error occured while borrowing the book");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured while borrowing the book");
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="mt-[4px] text-xl font-bebas-neue text-dark-100">
        {borrowing ? "Borrowing..." : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBookBtn;
