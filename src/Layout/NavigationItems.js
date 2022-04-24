import NavigationItem from "./NavigationItem";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import TelegramIcon from "@material-ui/icons/Telegram";
import HomeIcon from "@material-ui/icons/Home";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import SearchIcon from "@material-ui/icons/Search";

const NavigationItems = () => {
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
        </List>
    );
};

export default NavigationItems;
