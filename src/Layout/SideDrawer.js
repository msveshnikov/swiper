import React from "react";
import NavigationItems from "./NavigationItems";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const SideDrawer = ({ open, onDrawer }) => {
    const toggleDrawer = (o) => () => {
        onDrawer(o);
    };

    return (
        <div>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div role="presentation" onClick={toggleDrawer(false)}>
                    <NavigationItems />
                </div>
            </SwipeableDrawer>
        </div>
    );
};

export default SideDrawer;
