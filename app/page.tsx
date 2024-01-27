import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link className="btn btn-primary" href="/todo">
        Todos
      </Link>
    </main>
  );
}
