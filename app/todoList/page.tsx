import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

async function getData() {
  const res = await fetch("http://localhost:3200/todos");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data as any[];
}

export default async function TodoList() {
  const data = await getData();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="todo table">
        <TableHead>
          <TableRow>
            <TableCell>Beschreibung</TableCell>
            <TableCell>Erledigt</TableCell>
            <TableCell>Datum bis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.done}</TableCell>
              <TableCell>{row.targetDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
