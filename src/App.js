import React from "react";
import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./App.css";
import Heart from "./Heart";

function App() {
    const preload = 5;
    const [margin, setMargin] = useState(preload);
    const [images, setImages] = useState([]);

    const onSwipe = () => {
        setMargin((prev) => prev + 1);
    };

    const fetchImage = (i) => {
        fetch(`https://source.unsplash.com/random/900x2000?sig=${i}`).then((res) =>
            setImages((old) => [...old, res.url])
        );
    };

    useEffect(() => {
        for (var i = 0; i < preload; i++) {
            fetchImage(i);
        }
    }, []);

    useEffect(() => {
        fetchImage(margin);
    }, [margin]);

    return (
        <div>
            <div className="cardContainer">
                {images
                    .slice(margin - preload, margin)
                    .reverse()
                    .map((image) => (
                        <TinderCard onSwipe={onSwipe} key={image} className="swipe">
                            <div style={{ backgroundImage: "url(" + image + ")" }} className="card">
                                <Heart />
                            </div>
                        </TinderCard>
                    ))}
            </div>
        </div>
    );
}

export default App;
