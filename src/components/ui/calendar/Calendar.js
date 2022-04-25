import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, DAY_SPACING } from "./config";
import { Day } from "./Day";
import CalendarEventDispatcher from "./CalendarEventDispatcher";
import CalendarGlobal from "./CalendarGlobal";

export class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      days: props.days,
      selectedSlot: null,
    };

    CalendarEventDispatcher.createTopic("onSlotSelected");
    CalendarEventDispatcher.subscribe(
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
    console.log(ev);
    if (this.state.selectedSlot) {
      if (ev.code === "Escape") {
        CalendarGlobal.setSelectedSlot(null);
        this.setState({ selectedSlot: null });
      }
    }
  }

  onSlotSelected() {
    // workaround to rerender entire calendar
    this.setState({ selectedSlot: CalendarGlobal.getSelectedSlot() });
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
