import React from "react";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import splash from "./splash.json";
import { useReward } from "react-rewards";
import _ from "underscore";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const images = _.shuffle(
    Array.from(new Map(Object.entries(splash.data)).values()).filter((image) => image?.createdAt?.value)
);

const useStyles = makeStyles((theme) => ({
    icon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        color: "gray",
        zIndex: 100,
    },
    liked: {
        color: "yellow",
    },
}));

function App() {
    const classes = useStyles();
    const preload = 3;
    const [margin, setMargin] = useState(preload);
    const [liked, setLiked] = React.useState(null);
    const { reward } = useReward("rewardId", "emoji", { zIndex: 100 });

    const onSwipe = () => {
        setLiked(false);
        setMargin((prev) => prev + 1);
    };

    const handleLikeClick = () => {
        setLiked(!liked);
        if (!liked) {
            reward();
        }
    };

    return (
        <div>
            <div className="cardContainer">
                {images
                    .slice(margin - preload, margin)
                    .reverse()
                    .map((image) => (
                        <TinderCard onSwipe={onSwipe} key={image?.createdAt?.value} className="swipe">
                            <div style={{ backgroundImage: "url(" + image.photoUrl + ")" }} className="card">
                                <IconButton
                                    id="rewardId"
                                    className={clsx(classes.icon, liked && classes.liked)}
                                    onTouchStart={handleLikeClick}
                                >
                                    <ThumbUpIcon />
                                </IconButton>
                            </div>
                        </TinderCard>
                    ))}
            </div>
        </div>
    );
}

export default App;
