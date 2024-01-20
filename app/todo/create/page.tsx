import DoneDate from "@/app/_components/done-date";
import { CreateTodoDto } from "@/app/_models/create-todo.dto";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Page() {
  async function saveTodo(formData: FormData) {
    "use server";
    const todo: CreateTodoDto = {
      description: formData.get("description")?.toString() || "",
      done: formData.get("done")
        ? Boolean(formData.get("done")?.toString())
        : false,
      targetDate: dayjs(formData.get("targetDate")?.toString()).format(),
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
      revalidatePath("/todo");
      redirect("/todo");
    }
  }

  return (
    <div>
      <form action={saveTodo}>
        <FormControl>
          <InputLabel htmlFor="description-input">Beschreibung</InputLabel>
          <Input
            id="description-input"
            name="description"
            aria-describedby="Beschreibung des Todos"
          />
          {/* <FormHelperText id="description-helper">
            Beschreiben sie das Todo
          </FormHelperText> */}
        </FormControl>

        <FormGroup>
          <FormControlLabel
            name="done"
            control={<Checkbox />}
            label="Erledigt"
          />
        </FormGroup>
        <DoneDate name="targetDate" date={new Date()}></DoneDate>
        <Box sx={{ m: 2 }}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" href="/todo">
              Zurück
            </Button>
            <Button variant="contained" type="submit">
              Speichern
            </Button>
          </Stack>
        </Box>
      </form>
    </div>
  );
}
