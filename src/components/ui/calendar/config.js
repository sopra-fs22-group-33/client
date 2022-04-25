import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const DAY_SPACING = 2;
export const DAY_HEIGHT = 400;
export const SLOT_SCALING = DAY_HEIGHT / 24;

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));