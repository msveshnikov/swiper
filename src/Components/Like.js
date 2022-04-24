import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import clsx from "clsx";
import submitEvent from "../utils/api";

const useStyles = makeStyles((theme) => ({
    icon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        color: "gray",
        margin: theme.spacing(1),
    },
    liked: {
        color: "red",
    },
}));

const Like = ({ liked, setLiked, reward, url }) => {
    const classes = useStyles();

    const onClick = () => {
        if (!liked) {
            reward();
            submitEvent(url, "like");
        }
        setLiked(!liked);
    };

    return (
        <IconButton
            id="rewardId"
            aria-label="Like button"
            className={clsx(classes.icon, liked && classes.liked)}
            onTouchEnd={onClick}
            onClick={onClick}
        >
            <FavoriteIcon />
        </IconButton>
    );
};

export default Like;
