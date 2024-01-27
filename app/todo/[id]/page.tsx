"use client";
import { UpdateTodoDto } from "@/app/_models/update-todo.dto";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let todo: UpdateTodoDto = {};
    if (formData.get("description")) {
      todo.description = formData.get("description")?.toString() || "";
    }
    console.log(formData.get("done")?.toString());
    if (formData.get("done")) {
      todo.done = Boolean(formData.get("done")?.toString());
    }
    if (formData.get("targetDate")) {
      todo.targetDate = new Date(formData.get("targetDate")?.toString() || "");
    }
    console.log(JSON.stringify(todo));

    const res = await fetch(`http://localhost:3200/todos/${params.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      console.log(`Error saving todo: ${res.status}`);
    } else {
      router.push("/todo");
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3200/todos/${params.id}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        console.log(new Date(data.targetDate).toLocaleDateString());
        setData(data);
        setLoading(false);
      });
  }, [params.id]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No todo data</p>;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            className="form-control"
            defaultValue={data.description}
          ></input>
        </div>
        <div className="mb-3 form-check">
          <input
            id="done"
            name="done"
            className="form-check-input"
            type="checkbox"
            defaultChecked={data.done}
          ></input>
          <label className="form-check-label" htmlFor="done">
            Done
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="targetDate" className="form-label">
            Duedate
          </label>
          <input
            id="targetDate"
            name="targetDate"
            type="date"
            className="form-control"
            defaultValue={new Date(data.targetDate).toLocaleDateString()}
          ></input>
        </div>
        <div className="d-grid gap-2 d-md-block">
          <a className="btn btn-primary" role="button" href="/todo">
            Back
          </a>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
