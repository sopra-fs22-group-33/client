import * as React from "react";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import {createRef, useState} from "react";

// todo: set in Calendar
const DAY_SPACING = 2;
const DAY_HEIGHT = 400;
const SLOT_SCALING = 10;

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

class Slot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: props.from,
            to: props.to,
        };
    }

    calcHeight() {
        return SLOT_SCALING * (this.state.to - this.state.from);
    }

    render() {
        return (
            <Item sx={{height: this.calcHeight()}}>
                from: {this.state.from}
                to: {this.state.to}
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

        this.ref = undefined;

        this.state = {
            slots: props.slots,
        };
    }

    render() {
        return (
            <Grid item xs={12 / 7}>
                <Item
                    ref={(el) => {
                        if (!el) return;
                        this.ref = el;
                    }}
                    sx={{height: DAY_HEIGHT}}
                    onClick={() => console.log(this.ref.getBoundingClientRect())}
                >
                    weekday: {this.props.weekday}
                    {this.state.slots.map((slot) => (
                        <Slot from={slot.from} to={slot.to}/>
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
                <Box sx={{width: 1}}>
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={DAY_SPACING}>
                            {this.state.days.map((day) => (
                                <Day weekday={day.weekday} slots={day.slots}/>
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
