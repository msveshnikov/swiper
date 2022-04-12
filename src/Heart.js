import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import clsx from "clsx";

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

const Heart = ({liked, setLiked, reward}) => {
    const classes = useStyles();

    const handleLikeClick = () => {
        if (!liked) {
            reward();
        }
        setLiked(!liked);
    };

    return (
        <IconButton
            id="rewardId"
            aria-label="Like button"
            className={clsx(classes.icon, liked && classes.liked)}
            onTouchEnd={handleLikeClick}
            onClick={handleLikeClick}
        >
            <FavoriteIcon />
        </IconButton>
    );
};

export default Heart;
