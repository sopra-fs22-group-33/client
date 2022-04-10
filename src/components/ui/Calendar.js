import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

class Slot extends React.Component {
  render() {
    return (
      <Item>
        from: {this.props.from}
        to: {this.props.to}
      </Item>
    );
  }
}

Slot.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
};

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: props.slots,
    };
  }

  render() {
    const xs = 12 / 7;
    const md = false;

    return (
      <Grid item xs={xs} md={md}>
        <Item>
          weekday: {this.props.weekday}
          {this.state.slots.map((slot) => (
            <Slot from={slot.from} to={slot.to} />
          ))}
        </Item>
      </Grid>
    );
  }
}

Day.propTypes = {
  slots: PropTypes.array,
};

export class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: props.days,
    };
  }

  render() {
    return (
      <div>
        <Box sx={{ width: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {this.state.days.map((day) => (
                <Day weekday={day.weekday} slots={day.slots} />
              ))}
            </Grid>
          </Box>
        </Box>
      </div>
    );
  }
}

Calendar.propTypes = {
  startingDate: PropTypes.string,
  days: PropTypes.array,
};
