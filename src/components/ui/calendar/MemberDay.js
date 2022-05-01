import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT } from "./config";
import { MemberSlot } from "./MemberSlot";
import Box from "@mui/material/Box";

export class MemberDay extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    // reference to object in parent
    this.day = props.day;

    this.ref = undefined;

    this.state = {
      slots: props.slots,
    };
  }

  render() {
    return (
      <Grid item xs={12 / 7}>
        <Box sx={{ width: 1 }} style={{ background: "gray" }}>
          weekday: {this.props.weekday}
        </Box>
        <Box
          ref={(el) => {
            if (!el) return;
            this.ref = el;
          }}
          sx={{ width: 1 / 7 }}
          style={{
            position: "absolute",
            height: DAY_HEIGHT,
            background: "lightgray",
          }}
        >
          {this.state.slots.map((slot) => (
            <MemberSlot
              slot={slot}
              timeFrom={slot.timeFrom}
              timeTo={slot.timeTo}
              schedules={slot.schedules}
              requirement={slot.requirement}
              id={slot.id}
              key={slot.id}
            />
          ))}
        </Box>
      </Grid>
    );
  }
}

MemberDay.propTypes = {
    slots: PropTypes.array,
};
