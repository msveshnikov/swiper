import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link as RouterLink } from "react-router-dom";

const NavigationItem = (props) => (
    <ListItem component={RouterLink} to={props.link} button>
        <ListItemIcon style={{minWidth: '40px'}} >{props.icon}</ListItemIcon>
        <ListItemText primary={props.children} />
    </ListItem>
);

export default NavigationItem;
