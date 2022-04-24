import NavigationItem from "./NavigationItem";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import TelegramIcon from "@material-ui/icons/Telegram";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
import HomeIcon from "@material-ui/icons/Home";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
// import { useSelector } from "react-redux";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import SearchIcon from "@material-ui/icons/Search";

const NavigationItems = () => {
    // const auth = useSelector((state) => state.auth.token !== null);
    // const userId = useSelector((state) => state.auth.userId);
    return (
        <List>
            <NavigationItem icon={<HomeIcon />} link="/social">
                Social
            </NavigationItem>
            <NavigationItem icon={<TelegramIcon />} link="/chat">
                Chat
            </NavigationItem>
            <NavigationItem icon={<LibraryBooksIcon />} link="/news">
                News
            </NavigationItem>
            <NavigationItem icon={<SearchIcon />} link="/search">
                Search
            </NavigationItem>

            <Divider />

            <NavigationItem icon={<MovieFilterIcon />} link="/movies">
                Movies
            </NavigationItem>
            <NavigationItem icon={<QueueMusicIcon />} link="/music">
                Music
            </NavigationItem>
            <NavigationItem icon={<WbSunnyIcon />} link="/weather">
                Weather
            </NavigationItem>
            <NavigationItem icon={<LocalHospitalIcon />} link="/covid">
                COVID-19
            </NavigationItem>
            <NavigationItem icon={<DashboardIcon />} link="/dashboard">
                Dashboard
            </NavigationItem>
            <NavigationItem icon={<ColorLensIcon />} link="/playground">
                Playground
            </NavigationItem>
            {/* {auth && userId === "5mprtbou7PQOZ1fTOEC81gwojPt2" && (
                <NavigationItem icon={<LockOpenIcon />} link="/admin">
                    Admin
                </NavigationItem>
            )} */}

            <Divider />
{/* 
            {!auth ? (
                <NavigationItem icon={<LockOpenIcon />} link="/auth">
                    Sign-In
                </NavigationItem>
            ) : (
                <NavigationItem icon={<ExitToAppIcon />} link="/auth/logout">
                    Logout
                </NavigationItem>
            )} */}
        </List>
    );
};

export default NavigationItems;
