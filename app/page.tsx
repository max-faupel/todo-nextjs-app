import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <Link href="/todoList">Todos</Link>
      </div>
    </main>
  );
}
