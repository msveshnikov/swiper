import React from "react";
import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Heart from "./Heart";
import Save from "./Save";
import "./App.css";
import isDoubleTap from "./DoubleTap";
import { useReward } from "react-rewards";

const App = () => {
    const [count, setCount] = useState(0);
    const [images, setImages] = useState([]);
    const [liked, setLiked] = useState(false);
    const { reward } = useReward("rewardId", "emoji", { zIndex: 10, lifetime: 70, startVelocity: 55, decay: 0.95 });

    const onSwipe = () => {
        setCount((old) => old + 1);
        setLiked(false);
    };

    const fetchImage = (i) => {
        fetch(`https://source.unsplash.com/random/900x2000?sig=${i}`).then((res) =>
            setImages((old) => {
                if (old.includes(res.url)) {
                    setCount((old) => old + 1);
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
        for (var i = 0; i < 5; i++) {
            fetchImage(i);
        }
    }, []);

    useEffect(() => {
        fetchImage(count);
    }, [count]);

    return (
        <div>
            <div className="cardContainer">
                {images.map((image) => (
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
