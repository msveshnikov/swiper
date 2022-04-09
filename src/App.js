import React from "react";
import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { useReward } from "react-rewards";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    icon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        color: "gray",
    },
    liked: {
        color: "red",
    },
}));

function App() {
    const preload = 3;
    const classes = useStyles();
    const [margin, setMargin] = useState(preload);
    const [liked, setLiked] = React.useState(null);
    const [images, setImages] = useState([]);
    const { reward } = useReward("rewardId", "emoji", { zIndex: 1000 });

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

    useEffect(() => {
        for (var i = 0; i < preload; i++) {
            fetch(`https://source.unsplash.com/random/500x1200?sig=${i}`).then((res) =>
                setImages((old) => [...old, res.url])
            );
        }
    }, []);

    useEffect(() => {
        fetch(`https://source.unsplash.com/random/500x1200?sig=${margin}`).then((res) =>
            setImages((old) => [...old, res.url])
        );
    }, [margin]);

    return (
        <div>
            <div className="cardContainer">
                {images
                    .slice(margin - preload, margin)
                    .reverse()
                    .map((image) => (
                        <TinderCard onSwipe={onSwipe} key={image} className="swipe">
                            <div style={{ backgroundImage: "url(" + image + ")" }} className="card">
                                <IconButton
                                    id="rewardId"
                                    className={clsx(classes.icon, liked && classes.liked)}
                                    onTouchEnd={handleLikeClick}
                                    onClick={handleLikeClick}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </div>
                        </TinderCard>
                    ))}
            </div>
        </div>
    );
}

export default App;
