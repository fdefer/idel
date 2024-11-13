'use client';

import { useEffect, useState } from 'react';

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  imageUrl: string;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div>
      <h1>Bookstore</h1>
      <div>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} style={{ marginBottom: '20px' }}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>{book.description}</p>
              <p>Price: ${book.price}</p>
              <img src={book.imageUrl} alt={book.title} style={{ width: '100px' }} />
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default BooksPage;