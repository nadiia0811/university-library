import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  allBooks: Book[] | undefined;
  containerClassName?: string;
}

const BookList = ({ title, allBooks, containerClassName }: Props) => {

  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {allBooks && allBooks.map((book) => (
          <BookCard key={book.id ?? book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
