"use client";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/de";

export default function DoneDate({ date }: { date: Date | undefined }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <DatePicker label="Datum bis" value={dayjs(date)} />
    </LocalizationProvider>
  );
}
