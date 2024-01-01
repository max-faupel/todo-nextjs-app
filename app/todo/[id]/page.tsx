import DoneDate from "@/app/_components/done-date";
import { Todo } from "@/app/_models/todo";
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

async function getData(id: string) {
  const res = await fetch(`http://localhost:3200/todos/${id}`);
  if (res.ok) {
    const data = await res.json();
    return data as Todo;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const saveTodo = async (formData: FormData) => {
    "use server";
    const description = formData.get("description");

    console.log({ description });
  };

  const data = await getData(params.id);

  return (
    <div>
      <form action={saveTodo} method="POST">
        <FormControl>
          <InputLabel htmlFor="description-input">Beschreibung</InputLabel>
          <Input
            id="description-input"
            value={data?.description}
            aria-describedby="Beschreibung des Todos"
          />
          {/* <FormHelperText id="description-helper">
            Beschreiben sie das Todo
          </FormHelperText> */}
        </FormControl>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox value={data?.done} />}
            label="Erledigt"
          />
        </FormGroup>
        <DoneDate date={data?.targetDate}></DoneDate>
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
