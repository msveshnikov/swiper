import React from "react";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import splash from "./splash.json";
import { useReward } from "react-rewards";
import { useDoubleTap } from "use-double-tap";
import _ from "underscore";
import "./App.css";

const images = _.shuffle(
    Array.from(new Map(Object.entries(splash.data)).values()).filter((image) => image?.createdAt?.value)
);

function App() {
    const preload = 3; 
    const [margin, setMargin] = useState(preload);
    const { reward } = useReward("rewardId", "emoji", { zIndex: 100 });

    const onSwipe = () => {
        setMargin((prev) => prev + 1);
    };

    const bind = useDoubleTap(() => {
        reward();
    });

    return (
        <div>
            <div className="cardContainer">
                {images
                    .slice(margin - preload, margin)
                    .reverse()
                    .map((image) => (
                        <TinderCard onSwipe={onSwipe} key={image?.createdAt?.value} className="swipe">
                            <div {...bind} style={{ backgroundImage: "url(" + image.photoUrl + ")" }} className="card"></div>
                            <span id="rewardId" />
                        </TinderCard>
                    ))}
            </div>
        </div>
    );
}

export default App;
