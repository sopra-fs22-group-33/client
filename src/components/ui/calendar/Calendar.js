import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import {DAY_HEIGHT, DAY_SPACING} from "./config";
import * as React from "react";

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