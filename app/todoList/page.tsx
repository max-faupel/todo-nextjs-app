import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

async function getData() {
  const res = await fetch("http://localhost:3200/todos");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data as any[];
}

function DoneIcon({ isDone }: { isDone: boolean }) {
  if (isDone) {
    return <CheckIcon></CheckIcon>;
  }
  return <CloseIcon></CloseIcon>;
}

export default async function TodoList() {
  const data = await getData();

  return (
    <div>
      <Link href="/">Home</Link>
      <TableContainer component={Paper}>
        <Table aria-label="Todos">
          <TableHead>
            <TableRow>
              <TableCell>Beschreibung</TableCell>
              <TableCell>Erledigt</TableCell>
              <TableCell>Datum bis</TableCell>
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
                <TableCell>{row.targetDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
