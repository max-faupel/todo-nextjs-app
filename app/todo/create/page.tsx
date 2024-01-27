"use client";
import { CreateTodoDto } from "@/app/_models/create-todo.dto";
import { redirect, useRouter } from "next/navigation";
import { FormEvent } from "react";
export default function Page() {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const todo: CreateTodoDto = {
      description: formData.get("description")?.toString() || "",
      done: formData.get("done")
        ? Boolean(formData.get("done")?.toString())
        : false,
      targetDate: formData.get("targetDate")?.toString() || "",
    };
    console.log(JSON.stringify(todo));

    const res = await fetch("http://localhost:3200/todos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      console.log(`Error saving todo: ${res.status}`);
    } else {
      router.push("/todo");
    }
  }

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
          ></input>
        </div>

        <div className="mb-3 form-check">
          <input
            id="done"
            name="done"
            className="form-check-input"
            type="checkbox"
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
          ></input>
        </div>
        <div className="d-grid gap-2 d-md-block">
          <a className="btn btn-primary" role="button" href="/todo">
            Back
          </a>
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
