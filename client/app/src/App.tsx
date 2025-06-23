import { useEffect, useState } from "react";
import "./App.css";

interface i_book {
  id: number;
  title: string;
  release_year: number;
}

export default function App() {
  const [books, setBooks] = useState<i_book[]>([]);
  const [title, setTitle] = useState<string>("");
  const [releaseYear, setReleaseYear] = useState<number>(0);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !releaseYear) return;

    const newBook = {
      title,
      release_year: releaseYear,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      const data = await response.json();
      console.log(data);
      setBooks((prev) => [data, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (e: React.FormEvent, pk: number) => {
    e.preventDefault();
    if (!pk) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/books/delete/${pk}`, {
        method: "DELETE",
      });

      setBooks((prev) => prev.filter((book) => book.id !== pk));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className="py-10 flex flex-col gap-8 items-center justify-center w-full h-full">
      <form className="w-100 flex flex-col items-center gap-4 bg-gray-800 p-8 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Book title..."
          className="w-[95%] bg-slate-200 text-gray-900 p-2 rounded-md"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release date..."
          className="w-[95%] bg-slate-200 text-gray-900 p-2 rounded-md"
          onChange={(e) => setReleaseYear(Number(e.target.value))}
        />
        <button
          onClick={(e) => addBook(e)}
          className="py-2 px-4 bg-slate-900 text-white rounded-md cursor-pointer"
        >
          Add book
        </button>
      </form>
      <div
        className={`w-100 flex flex-col items-center gap-4 bg-gray-800 p-8 rounded-lg shadow-lg ${
          books.length < 1 ? "hidden" : ""
        }`}
      >
        {books.map((book) => (
          <div
            className="w-[95%] flex items-center justify-between"
            key={book.id}
          >
            <div className="w-[95%] p-2 bg-slate-200 text-slate-900 rounded-lg shadow-md m-2">
              <p>Title: {book.title}</p>
              <p>Year: {book.release_year}</p>
            </div>
            <button
              onClick={(e) => deleteBook(e, book.id)}
              className="py-2 px-4 bg-slate-900 text-white rounded-md cursor-pointer"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
