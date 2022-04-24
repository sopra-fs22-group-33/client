import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, DAY_SPACING } from "./config";
import { Day } from "./Day";
import CalendarEventDispatcher from "./CalendarEventDispatcher";

export class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: props.days,
    };

    CalendarEventDispatcher.createTopic("slotSelected");
    CalendarEventDispatcher.subscribe(
      "slotSelected",
      this,
      this.onSlotSelected
    );
  }

  onSlotSelected() {
    // workaround to rerender entire calendar
    this.setState({ isSlotSelected: true });
  }

  render() {
    return (
      <Box sx={{ width: 1, flexGrow: 1 }}>
        <Grid
          container
          spacing={DAY_SPACING}
          style={{ height: DAY_HEIGHT * 3 }}
        >
          {this.state.days.map((day) => (
            <Day
              weekday={day.weekday}
              slots={day.slots}
              id={day.id}
              key={day.id}
            />
          ))}
        </Grid>
      </Box>
    );
  }
}

Calendar.propTypes = {
  startingDate: PropTypes.string,
  days: PropTypes.array,
};
