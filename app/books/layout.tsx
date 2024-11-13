export default function BooksLayout({ children }: { children: React.ReactNode }) {
    return (
      <section>
        <nav>Books Navigation</nav>
        <div>{children}</div>
      </section>
    );
  }