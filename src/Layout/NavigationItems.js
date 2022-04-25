import NavigationItem from "./NavigationItem";
import List from "@material-ui/core/List";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";

const NavigationItems = () => {
    return (
        <List>
            <NavigationItem icon={<HomeIcon />} link="/">
                Home
            </NavigationItem>
            <NavigationItem icon={<FavoriteIcon />} link="/likes">
                My Likes
            </NavigationItem>
        </List>
    );
};

export default NavigationItems;
