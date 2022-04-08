import React from "react";
import TinderCard from "react-tinder-card";
import "./App.css";
import splash from "./splash.json";

function App() {
    const map = new Map(Object.entries(splash.data));
    const images = Array.from(map.values()).slice(0, 50);
    return (
        <div>
            <div className="cardContainer">
                {Array.from(images).map((image, no) => (
                    <TinderCard key={no} className="swipe">
                        <div style={{ backgroundImage: "url(" + image.photoUrl + ")" }} className="card"></div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default App;
