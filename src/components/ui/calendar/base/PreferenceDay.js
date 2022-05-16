import { BaseDay } from "./BaseDay";
import { Day } from "../Day";
import * as React from "react";
import {PreferenceSlot} from "./PreferenceSlot";

export class PreferenceDay extends BaseDay {
  render() {
    return (
      <Day>
        {this.props.slots.map((slot) => (
          <PreferenceSlot
            key={slot.id}
            sx={{ width: slot.width, left: slot.left }}
            id={slot.id}
            slot={slot}
            timeFrom={slot.timeFrom}
            timeTo={slot.timeTo}
            base={slot.base}
          />
        ))}
      </Day>
    );
  }
}