import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Book from '../../../models/Book';

export async function GET() {
  try {
    await dbConnect(); // Connect to MongoDB
    const books = await Book.find(); // Fetch all books
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.error();
  }
}