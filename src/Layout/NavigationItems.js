import NavigationItem from "./NavigationItem";
import List from "@material-ui/core/List";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";

const NavigationItems = () => {
    return (
        <List>
            <NavigationItem icon={<HomeIcon />} link="/">
                Home
            </NavigationItem>
            <NavigationItem icon={<FavoriteIcon />} link="/likes">
                My Likes
            </NavigationItem>
            <NavigationItem icon={<SaveIcon />} link="/saves">
                My Saves
            </NavigationItem>
            <NavigationItem icon={<ShareIcon />} link="/shares">
                My Shares
            </NavigationItem>
        </List>
    );
};

export default NavigationItems;
