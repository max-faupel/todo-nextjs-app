import Link from "next/link";
import { Todo } from "../_models/todo";

async function getData() {
  const res = await fetch("http://localhost:3200/todos", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data as Todo[];
}

export default async function TodoList() {
  const data = await getData();

  return (
    <main>
      <div>
        <Link className="btn btn-primary" href="/todo/create">
          New
        </Link>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                <p>Beschreibung</p>
              </th>
              <th>
                <p>Erledigt</p>
              </th>
              <th>
                <p>Datum bis</p>
              </th>
              <th>
                <p>Aktionen</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row._id}>
                <td>
                  <p>{row.description}</p>
                </td>
                <td>
                  <p>{row.done}</p>
                </td>
                <td>
                  <p>{row.targetDate.toString()}</p>
                </td>
                <td className="p-4">
                  <Link className="btn btn-primary" href={`/todo/${row._id}`}>
                    Bearbeiten
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
