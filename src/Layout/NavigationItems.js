import NavigationItem from "./NavigationItem";
import List from "@material-ui/core/List";
import FavoriteIcon from "@material-ui/icons/Favorite";

const NavigationItems = () => {
    return (
        <List>
            <NavigationItem icon={<FavoriteIcon />} link="/likes">
                My Likes
            </NavigationItem>
        </List>
    );
};

export default NavigationItems;
