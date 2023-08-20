import { useState, useEffect, useRef } from "react";
import "./Cards.css";
import Card from "./Card";
import Keys from "./Keys";

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

    const fetchImage = () => {
        if (pics.length === 0) {
            return;
        }
        const res = pics[Math.floor(Math.random() * pics.length)];
        setImages((old) => {
            return [res, ...old];
        });
    };

    useEffect(() => {
        fetch(`https://mangatv.shop/api/stories?lang=ru_RU`)
            .then((res) => res.json())
            .then((res) => {
                setPics(
                    res
                        .filter((i) => i.vertical)
                        .flatMap((i) => i.script)
                        .flatMap((i) => i.image)
                        .map((i) => "https://mangatv.shop/api" + i)
                );
            });
    }, []);

    useEffect(() => {
        for (var i = 0; i < 5; i++) {
            fetchImage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pics]);

    useEffect(() => {
        fetchImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

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
