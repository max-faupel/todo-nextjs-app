import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "dayjs/locale/de";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Todo } from "../_models/todo";

function DoneIcon({ isDone }: { isDone: boolean }) {
  if (isDone) {
    return <CheckIcon></CheckIcon>;
  }
  return <CloseIcon></CloseIcon>;
}

export default function TodoList() {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3200/todos");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  return (
    <div>
      <Link href="/">Home</Link>
      <Box sx={{ m: 2 }}>
        <Button variant="contained" href="/todo/0">
          Neu
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="Todos">
          <TableHead>
            <TableRow>
              <TableCell>Beschreibung</TableCell>
              <TableCell>Erledigt</TableCell>
              <TableCell>Datum bis</TableCell>
              <TableCell>Aktionen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <DoneIcon isDone={row.done}></DoneIcon>
                </TableCell>
                <TableCell>{row.targetDate.toString()}</TableCell>
                <TableCell>
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" href={`/todo/${row._id}`}>
                      Bearbeiten
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
