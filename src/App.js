import React from "react";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import { useReward } from "react-rewards";
import splash from "./splash.json";
import "./App.css";
import _ from "underscore";

const images = _.shuffle(
    Array.from(new Map(Object.entries(splash.data)).values()).filter((image) => image?.createdAt?.value)
);

function App() {
    const [margin, setMargin] = useState(10);
    const { reward } = useReward("rewardId", "emoji", { zIndex: 100 });

    const onSwipe = () => {
        setMargin((prev) => prev + 1);
    };

    const onDoubleClick = (e) => {
        reward();
    };

    const onClick = (e) => {
        if (e.detail === 2) {
            reward();
        }
    };

    return (
        <div>
            <div className="cardContainer">
                {images
                    .slice(margin - 10, margin)
                    .reverse()
                    .map((image) => (
                        <TinderCard onSwipe={onSwipe} key={image?.createdAt?.value} className="swipe">
                            <div
                                onDoubleClick={onDoubleClick}
                                onClick={onClick}
                                style={{ backgroundImage: "url(" + image.photoUrl + ")" }}
                                className="card"
                            ></div>
                            <span id="rewardId" />
                        </TinderCard>
                    ))}
            </div>
        </div>
    );
}

export default App;
