import React, { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);
  const createBook = (title) => {
    // BAD CODE !!
    //books.push({ id: 123, title: title });
    //                                                Bad code olmasının sebebi şu biz state içerisinde boş bir array verdiğimizde bellekte yeni
    //setBooks(books);                               bir yer açar ve sonra push işlemiyle içerisine yeni title'ı puslarız fakat aynı arrayın içerisine yenisini ekleyip
    //                                                tekrar books'u set ettiğimiz için bunu renderlamaya gerek duymaz ve kaç tane eklersek ekleyelim ekranda arrayın içi o sıra
    //                                                0 gözükür. bu yüzden yeni bir array de bu işlemi halleder sonra useState'in içerisinde ki array'a atarız ve farklı iki
    //                                                array olduğu için js bunu renderlar (arrays, objects) 91.video da obje ve dizilere nasıl güncelleme yapılmaz bol bol anlatılıyor.
    const updatedBooks = [
      ...books,
      { id: Math.round(Math.random() * 9999), title },
    ];
    setBooks(updatedBooks);
  };

  const deleteBookById = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id; // burası koşul gelen id ile dizi içerisinde uymayan bütün dataları yeni bir arrayin içerisine alır ve genel arrayı bu yeni array ile değiştiririz ve bu kaldırma işlemi yapmışız gibi gözükür.
    });

    setBooks(updatedBooks);
  };
  return (
    <div className="app">
      {books.length}
      <BookList books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}
export default App;
