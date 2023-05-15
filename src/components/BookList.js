import React from "react";
import BookShow from "./BookShow";

const BookList = ({ books, onDelete, onEdit }) => {
  const renderedBooks = books.map((book) => {
    return (
      <BookShow
        onEdit={onEdit}
        key={books.id}
        book={book}
        onDelete={onDelete}
      />
    );
  });
  return <div className="book-list">{renderedBooks}</div>;
};

export default BookList;
