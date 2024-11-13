import { Schema, model, models } from 'mongoose';

interface Book {
  title: string;
  author: string;
  description: string;
  price: number;
  imageUrl: string;
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const BookModel = models.Book || model<Book>('Book', bookSchema);

export default BookModel;