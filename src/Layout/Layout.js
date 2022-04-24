import SideDrawer from "./SideDrawer";
import { withTheme } from "@material-ui/core/styles";
import { useState } from "react";

const Layout = ({ children }) => {
    const [drawer, setDrawer] = useState(false);

    return (
        <>
            <SideDrawer onDrawer={setDrawer} open={drawer} />

            {children}
        </>
    );
};

export default withTheme(Layout);
