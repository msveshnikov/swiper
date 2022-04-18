import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import clsx from "clsx";

const API_URL = "https://api.swiper.ml";

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

    const getIp = async () => {
        const res = await fetch("https://geolocation-db.com/json/");
        const body = await res.json();
        console.log(body);
        return body.IPv4;
    };

    const submit = async () => {
        const event = {
            photoUrl: url,
            userId: getIp(),
            eventType: "like",
        };

        await fetch(API_URL + "/event", {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json",
            },
        });
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
