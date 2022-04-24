import React from "react";
import NavigationItems from "./NavigationItems";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

export default function SwipeableTemporaryDrawer({ open, onDrawer }) {

    const toggleDrawer = (o) => (event) => {
        onDrawer(o);
    };

    return (
        <div>
            <SwipeableDrawer
                hysteresis={0.1}
                minFlingVelocity={50}
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
}
