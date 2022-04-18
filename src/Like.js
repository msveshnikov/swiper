import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import clsx from "clsx";

const API_URL = "http://localhost:4000";

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

const Like = ({ liked, setLiked, reward }) => {
    const classes = useStyles();

    const submit = async () => {
        const event = {
            photoUrl: "this.state.name",
            userId: 1,
            eventType: "like",
        };

        const res = await fetch(API_URL + "/event", {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return console.log(data);
    };

    const onClick = () => {
        if (!liked) {
            reward();
            submit();
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
