import React from "react";
import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Heart from "./Heart";
import "./App.css";
import isDblTouchTap from "./isDblTouchTap";
import { useReward } from "react-rewards";

function App() {
    const preload = 5;
    const [margin, setMargin] = useState(preload);
    const [images, setImages] = useState([]);
    const { reward } = useReward("rewardId", "emoji", { zIndex: 10 });
    const [liked, setLiked] = useState(false);

    const onSwipe = () => {
        setMargin((prev) => prev + 1);
        setLiked(false);
    };

    const fetchImage = (i) => {
        fetch(`https://source.unsplash.com/random/900x2000?sig=${i}`).then((res) =>
            setImages((old) => {
                if (old.includes(res.url)) {
                    setMargin((prev) => prev + 1);
                }
                return [...old, res.url];
            })
        );
    };

    const onTap = (e) => {
        if (isDblTouchTap(e) && !liked) {
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
        fetchImage(margin);
    }, [margin]);

    return (
        <div>
            <div className="cardContainer">
                {[...new Set(images)]
                    .slice(-preload)
                    .reverse()
                    .map((image) => (
                        <TinderCard onSwipe={onSwipe} key={image} className="swipe">
                            <div onTouchEnd={onTap} style={{ backgroundImage: "url(" + image + ")" }} className="card">
                                <Heart liked={liked} setLiked={setLiked} reward={reward} />
                            </div>
                        </TinderCard>
                    ))}
            </div>
        </div>
    );
}

export default App;
