import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome!</h1>
        <div>
          <Link href="/books">Go to Books Page</Link>
        </div>
        <div>
          <Link href="/about">Go to About Page</Link>
        </div>
    </main>
  );
}
