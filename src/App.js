import React from "react";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import splash from "./splash.json";
import "./App.css";

function App() {
    const map = new Map(Object.entries(splash.data));
    const images = Array.from(map.values());
    const [margin, setMargin] = useState(10);

    const onSwipe = () => {
        setMargin(margin + 1);
    };

    return (
        <div>
            <div className="cardContainer">
                {Array.from(images.slice(0, margin)).map((image, no) => (
                    <TinderCard onSwipe={onSwipe} key={no} className="swipe">
                        <div style={{ backgroundImage: "url(" + image.photoUrl + ")" }} className="card"></div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default App;
