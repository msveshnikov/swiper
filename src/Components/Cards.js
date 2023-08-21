import { useState, useEffect, useRef, useCallback } from "react";
import "./Cards.css";
import Card from "./Card";
import Keys from "./Keys";

export const getVideo = async (url) => {
    const res = await fetch(`https://mangatv.shop/api/images`);
    const data = await res.json();
    return "https://mangatv.shop/api" + data.images.find((i) => "https://mangatv.shop/api" + i.image === url).video;
};

const Cards = () => {
    const [count, setCount] = useState(5);
    const [images, setImages] = useState([]);
    const [pics, setPics] = useState([]);
    const topCard = useRef();

    const onSwipe = () => {
        setCount((old) => old + 1);
    };

    const onLeftScreen = (url) => {
        setImages((old) => old.filter((i) => i !== url));
    };

    const fetchImage = useCallback(() => {
        if (pics.length === 0) return;
        const res = pics[Math.floor(Math.random() * pics.length)];
        setImages((old) => [res, ...old]);
    }, [pics]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://mangatv.shop/api/images`);
            const data = await res.json();
            setPics(data.images.map((i) => "https://mangatv.shop/api" + i.image));
        };
        fetchData();
    }, []);

    useEffect(() => {
        for (var i = 0; i < 5; i++) {
            fetchImage();
        }
    }, [pics, fetchImage]);

    useEffect(() => {
        fetchImage();
    }, [count, fetchImage]);

    return (
        <div>
            <Keys topCard={topCard} />
            <div className="cardContainer">
                {images.map((url) => (
                    <Card key={url} url={url} onSwipe={onSwipe} onLeftScreen={onLeftScreen} card={topCard} />
                ))}
            </div>
        </div>
    );
};

export default Cards;
