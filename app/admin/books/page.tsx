import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button
          className="bg-primary-admin text-light-100  hover:text-dark-100"
          asChild 
        >
          <Link href="/admin/books/new">+ Create A New Book</Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <p>Table</p>
      </div>
    </section>
  );
};

export default page;
