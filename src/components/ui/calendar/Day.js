import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, SLOT_REL_WIDTH } from "./config";
import Box from "@mui/material/Box";
import "styles/ui/Calendar.scss";


/**
 * Takes slots and assigns left and width style properties to overlapping slots
 *
 * @param slots
 * @param newSlot
 * @returns {slots}
 */
export function handleOverlap(slots, newSlot) {
  function valueToStrPercent(value) {
    return (value * 100).toString().concat("%");
  }

  function compareFunc(b, a) {
    // inverted sorting to put first shift left
    if (a.timeFrom < b.timeFrom) {
      return 1;
    }
    if (a.timeFrom > b.timeFrom) {
      return -1;
    }
    return 0;
  }

  // reset
  slots.forEach((slot) => {
    slot.overlapCount = null;
    slot.left = null;
    slot.width = null;
  });

  // calculate overlaps
  let evaluated, slot;
  for (evaluated of slots) {
    if (!evaluated.overlapCount) {
      evaluated.overlapCount = 0;
    }
    for (slot of slots) {
      if (evaluated === slot) {
        continue;
      }
      if (!slot.overlapCount) {
        slot.overlapCount = 0;
      }

      if (
        // check only one subcase to avoid duplication
        (evaluated.timeFrom > slot.timeFrom &&
          evaluated.timeTo <= slot.timeTo) ||
        (evaluated.timeFrom <= slot.timeFrom &&
          evaluated.timeTo > slot.timeFrom &&
          evaluated.timeTo < slot.timeTo)
      ) {
        evaluated.overlapCount++;
        slot.overlapCount++;

        evaluated.overlapCount = Math.min(
          evaluated.overlapCount,
          slot.overlapCount
        );
        slot.overlapCount = evaluated.overlapCount;
      } else if (
        // treated separately to avoid duplication
        evaluated.timeFrom === slot.timeFrom &&
        evaluated.timeTo === slot.timeTo
      ) {
        evaluated.overlapCount++;
      }
    }
  }

  slots = slots.sort(compareFunc);

  // set properties
  let isPushedRight = false;
  evaluated = slots[0];
  for (slot of slots) {
    if (slot.overlapCount < 1) {
      continue;
    }
    if (slot.overlapCount > 1) {
      alert("At most two overlapping schedules are allowed");
      if (newSlot) {
        slots = slots.filter((o) => o !== newSlot);
      } else {
        slots = slots.filter((o) => o !== slot);
      }
      return handleOverlap(slots);
    }
    slot.width = valueToStrPercent(SLOT_REL_WIDTH / 2);
    if (isPushedRight) {
      slot.left = valueToStrPercent(SLOT_REL_WIDTH / 2);
    }
    //alternate
    if (evaluated.timeTo <= slot.timeTo) {
      isPushedRight = !isPushedRight;
      evaluated = slot;
    }
  }

  return slots;
}

/**
 * Generic day component that defines day styling
 */
export class Day extends React.Component {
  render() {
    return (
      <Grid item xs={12 / 7}>
        <Box sx={{ width: 1, pb: "12px" }} style={{}}>
          <div className={"day-title"}>Monday{this.props.weekday}</div>
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: 1 / 10,
            height: DAY_HEIGHT,
            //background: "lightgray",
            border: 1,
            borderColor: "gray",
            borderRadius: "5px",
          }}
          onMouseDown={this.props.onMouseDown}
        >
          {this.props.children}
        </Box>
      </Grid>
    );
  }
}

Day.propTypes = {
    onMouseDown: PropTypes.func,
};
