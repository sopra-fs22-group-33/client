import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";
import PropTypes from "prop-types";

export const CalendarDatePicker = (props) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      value={props.value}
      onChange={props.onChange}
      renderInput={(params) => <TextField {...params} />}
    />
  </LocalizationProvider>
);

CalendarDatePicker.propTypes = {
  value: PropTypes.object.isRequired /* date */,
  onChange: PropTypes.func.isRequired,
};