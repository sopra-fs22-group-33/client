import * as React from 'react';
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export class Calendar extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            startingDate: props.startingDate,
            days: props.days,
        };
    }

    render() {
        const xs = 12 / 7;
        const md = false;

        return (
            <div>
                <div>
                    {this.state.days}
                </div>
                <Box sx={{width: 1}}>
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={1}>
                            <Grid item xs={xs} md={md}>
                                <Item>day</Item>
                            </Grid>
                            <Grid item xs={xs} md={md}>
                                <Item>day</Item>
                            </Grid>
                            <Grid item xs={xs} md={md}>
                                <Item>day</Item>
                            </Grid>
                            <Grid item xs={xs} md={md}>
                                <Item>day</Item>
                            </Grid>
                            <Grid item xs={xs} md={md}>
                                <Item>day</Item>
                            </Grid>
                            <Grid item xs={xs} md={md}>
                                <Item>day</Item>
                            </Grid>
                            <Grid item xs={xs} md={md}>
                                <Item>day</Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        );
    }
}

Calendar.propTypes = {
    startingDate: PropTypes.string,
    days: PropTypes.array
}