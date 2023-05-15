import React, { useEffect, useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async (title) => {
    // BAD CODE !!
    //books.push({ id: 123, title: title });
    //                                                Bad code olmasının sebebi şu biz state içerisinde boş bir array verdiğimizde bellekte yeni
    //setBooks(books);                               bir yer açar ve sonra push işlemiyle içerisine yeni title'ı puslarız fakat aynı arrayın içerisine yenisini ekleyip
    //                                                tekrar books'u set ettiğimiz için bunu renderlamaya gerek duymaz ve kaç tane eklersek ekleyelim ekranda arrayın içi o sıra
    //                                                0 gözükür. bu yüzden yeni bir array de bu işlemi halleder sonra useState'in içerisinde ki array'a atarız ve farklı iki
    //                                                array olduğu için js bunu renderlar (arrays, objects) 91.video da obje ve dizilere nasıl güncelleme yapılmaz bol bol anlatılıyor.
    // ----
    const response = await axios.post("http://localhost:3001/books", { title });
    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };
  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return response.data;
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/books/${id}`);
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onEdit={editBookById} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}
export default App;
