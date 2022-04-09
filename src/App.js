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
    const preload = 5; /* The number of images to be displayed. */
    const [margin, setMargin] = useState(preload);
    const { reward } = useReward("rewardId", "emoji", { zIndex: 100 });

    const onSwipe = () => {
        setMargin((prev) => prev + 1);
    };

    /* A hook that allows you to double tap on the image to trigger the reward. */
    const bind = useDoubleTap(() => {
        reward();
    }, 500);

    return (
        <div>
            <div className="cardContainer">
                {images
                    .slice(margin - preload, margin)
                    .reverse()
                    .map((image) => (
                        <TinderCard {...bind} onSwipe={onSwipe} key={image?.createdAt?.value} className="swipe">
                            <div
                                {...bind}
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
