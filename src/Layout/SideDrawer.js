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
                hysteresis={0.25}
                minFlingVelocity={50}
                swipeAreaWidth={50}
                transitionDuration={30}
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
