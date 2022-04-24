import NavigationItem from "./NavigationItem";
import List from "@material-ui/core/List";
import TelegramIcon from "@material-ui/icons/Telegram";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SearchIcon from "@material-ui/icons/Search";

const NavigationItems = () => {
    return (
        <List>
            <NavigationItem icon={<FavoriteIcon />} link="/likes">
                My Likes
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
        </List>
    );
};

export default NavigationItems;
