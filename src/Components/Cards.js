import { useState, useEffect, useRef } from "react";
import "./Cards.css";
import useScreenOrientation from "react-hook-screen-orientation";
import Card from "./Card";
import Keys from "./Keys";

const Cards = () => {
    const [count, setCount] = useState(5);
    const [images, setImages] = useState([]);
    const [pics, setPics] = useState([]);
    const [swiped, setSwiped] = useState([]);
    const orientation = useScreenOrientation();
    const topCard = useRef();

    const onSwipe = (url) => {
        setSwiped((old) => [url, ...old]);
        setCount((old) => old + 1);
    };

    const onLeftScreen = (url) => {
        setImages((old) => old.filter((i) => i !== url));
    };

    const fetchImage = () => {
        if (pics.length === 0) return;
        const res = pics[Math.floor(Math.random() * pics.length)];
        setImages((old) => {
            if (old.includes(res)) {
                setCount((old) => old + 1);
                return old;
            }
            return [res, ...old];
        });
    };

    useEffect(() => {
        fetch(`https://mangatv.shop/api/stories`)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        for (var i = 0; i < 5; i++) {
            fetchImage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pics]);

    useEffect(() => {
        fetchImage(count, orientation);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    return (
        <div>
            <Keys topCard={topCard} />
            <div className="cardContainer">
                {images.map((url) => (
                    <Card
                        key={url}
                        url={url}
                        onSwipe={onSwipe}
                        onLeftScreen={onLeftScreen}
                        card={swiped.includes(url) ? null : topCard}
                    />
                ))}
            </div>
        </div>
    );
};

export default Cards;
