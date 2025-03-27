import React from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { eq, inArray } from "drizzle-orm";
import { books, borrowRecords } from "@/database/schema";

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const getBooksById = async (bookIds: string[]) => {
    let borrowedBooks: Book[];

    if (!bookIds || bookIds.length === 0) return [];
    try {
      borrowedBooks = await db
        .select()
        .from(books)
        .where(inArray(books.id, bookIds));

      return borrowedBooks;
    } catch (error) {
      console.log("error occured: ", error);
    }
  };

  const res = await db
    .select({ bookId: borrowRecords.bookId })
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, userId));

  const bookIds: string[] = res.length > 0 ? res.map((book) => book.bookId) : [];
  const takenBooks = (await getBooksById(bookIds)) ?? [];

  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Log Out</Button>
      </form>
      <BookList title="Borrowed Books" allBooks={takenBooks} />
    </>
  );
};

export default Page;
