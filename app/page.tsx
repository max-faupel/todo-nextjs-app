import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <Link href="/todo">Todos</Link>
      </div>
    </main>
  );
}
