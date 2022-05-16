import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { DAY_HEIGHT, DAY_SPACING } from "./config";
import * as React from "react";

/**
 * Count set jokers/special preferences in a calendar for a user
 * @param days{object}
 * @param userId{number}
 */
export function countJokers(days, userId) {
  let count = 0;

  let d, sl, sc;
  let day, slot, schedule;
  for (d in days) {
    day = days[d];
    for (sl in day.slots) {
      slot = day.slots[sl];
      for (sc in slot.schedules) {
        schedule = slot.schedules[sc];
        if (schedule.user.id === userId && schedule.special !== -1) {
          count++;
        }
      }
    }
  }
  return count;
}

/**
 * Generic calendar component that defines calendar styling
 */
export class Calendar extends React.Component {
  render() {
    return (
      <Box sx={{ width: 1, flexGrow: 1 }}>
        <Grid
          container
          spacing={DAY_SPACING}
          style={{ height: DAY_HEIGHT * 1.2 }}
        >
          {this.props.children}
        </Grid>
      </Box>
    );
  }
}