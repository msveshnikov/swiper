import React from "react";
import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Heart from "./Heart";
import Save from "./Save";
import "./App.css";
import isDoubleTap from "./isDoubleTap";
import { useReward } from "react-rewards";

const App = () => {
    const preload = 5;

    const [count, setCount] = useState(0);
    const [images, setImages] = useState([]);
    const { reward } = useReward("rewardId", "emoji", { zIndex: 10, lifetime: 70, startVelocity: 55, decay: 0.95 });
    const [liked, setLiked] = useState(false);

    const onSwipe = () => {
        setCount((prev) => prev + 1);
        setLiked(false);
    };

    const fetchImage = (i) => {
        fetch(`https://source.unsplash.com/random/900x2000?sig=${i}`).then((res) =>
            setImages((old) => {
                if (old.includes(res.url)) {
                    setCount((prev) => prev + 1);
                    return old;
                }
                return [res.url, ...old];
            })
        );
    };

    const onTap = (e) => {
        if (isDoubleTap(e) && !liked) {
            setLiked(true);
            reward();
        }
    };

    useEffect(() => {
        for (var i = 0; i < preload - 1; i++) {
            fetchImage(i);
        }
    }, []);

    useEffect(() => {
        fetchImage(count);
    }, [count]);

    return (
        <div>
            <div className="cardContainer">
                {images
                    // .slice(0, preload)
                    .map((image) => (
                        <TinderCard onSwipe={onSwipe} key={image} className="swipe">
                            <div onTouchEnd={onTap} style={{ backgroundImage: "url(" + image + ")" }} className="card">
                                <Heart liked={liked} setLiked={setLiked} reward={reward} />
                                <Save url={image.split("?")[0]} />
                            </div>
                        </TinderCard>
                    ))}
            </div>
        </div>
    );
};

export default App;
