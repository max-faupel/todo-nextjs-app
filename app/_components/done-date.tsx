"use client";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/de";

export default function DoneDate({
  date,
  name,
}: {
  date: Date | undefined;
  name: string;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DatePicker name={name} label="Datum bis" value={dayjs(date)} />
    </LocalizationProvider>
  );
}
