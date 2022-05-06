import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, DAY_SPACING } from "./config";
import { AdminDay } from "./AdminDay";
import calendarEventDispatcher from "./calendarEventDispatcher";
import calendarGlobal from "./calendarGlobal";

export class AdminCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      days: props.days,
      selectedSlot: null,
    };

    calendarEventDispatcher.createTopic("onSlotSelected");
    calendarEventDispatcher.createTopic("onSlotDeleted");
    calendarEventDispatcher.createTopic("onSlotUpdated");

    calendarEventDispatcher.subscribe(
      "onSlotSelected",
      this,
      this.onSlotSelected
    );
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(ev) {
    if (this.state.selectedSlot) {
      // deselect slot
      if (ev.code === "Escape") {
        calendarGlobal.setSelectedSlot(null);
        this.setState({ selectedSlot: null });
      }
      // delete slot
      else if (ev.code === "Backspace" || ev.code === "Delete") {
        calendarEventDispatcher.dispatch("onSlotDeleted");
      }
    }
  }

  onSlotSelected() {
    // workaround to rerender entire calendar
    this.setState({ selectedSlot: calendarGlobal.getSelectedSlot() });
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
            <AdminDay
              day={day}
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

AdminCalendar.propTypes = {
  startingDate: PropTypes.string,
  days: PropTypes.array,
};
