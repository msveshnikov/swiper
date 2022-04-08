import React from "react";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import splash from "./splash.json";
import "./App.css";
import { useReward } from "react-rewards";
import { useDoubleTap } from "use-double-tap";

function App() {
    const images = Array.from(new Map(Object.entries(splash.data)).values()).filter((image) => image?.createdAt?.value);
    const [margin, setMargin] = useState(10);
    const { reward } = useReward("rewardId", "emoji", { zIndex: 100 });

    const onSwipe = () => {
        setMargin((prev) => prev + 1);
    };

    const bind = useDoubleTap((event) => {
        reward();
    });

    return (
        <div>
            <div className="cardContainer">
                {images
                    .slice(margin - 10, margin)
                    .reverse()
                    .map((image) => (
                        <TinderCard onSwipe={onSwipe} key={image?.createdAt?.value} className="swipe">
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
