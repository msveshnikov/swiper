import React from "react";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import splash from "./splash.json";
import "./App.css";
import { useReward } from "react-rewards";
import { useDoubleTap } from "use-double-tap";

function App() {
    const images = Array.from(new Map(Object.entries(splash.data)).values());
    const [margin, setMargin] = useState(10);
    const { reward } = useReward("rewardId", "emoji");

    const onSwipe = () => {
        setMargin(margin + 1);
    };

    const bind = useDoubleTap((event) => {
        reward();
    });

    return (
        <div>
            <div className="cardContainer">
                {images.slice(0, margin).map((image, no) => (
                    <TinderCard id="rewardId" {...bind} onSwipe={onSwipe} key={no} className="swipe">
                        <div style={{ backgroundImage: "url(" + image.photoUrl + ")" }} className="card"></div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default App;
