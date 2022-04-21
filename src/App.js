import { useState, useEffect, useRef } from "react";
import "./App.css";
import useScreenOrientation from "react-hook-screen-orientation";
import submitEvent from "./api";
import Card from "./Card";
import Keys from "./Keys";

const App = () => {
    const [count, setCount] = useState(5);
    const [images, setImages] = useState([]);
    const [swiped, setSwiped] = useState([]);
    const orientation = useScreenOrientation();
    const topCard = useRef();

    const onSwipe = (url, dir) => {
        setSwiped((old) => [url, ...old]);
        submitEvent(url, "swipe " + dir);
        setCount((old) => old + 1);
    };

    const onLeftScreen = (url) => {
        setImages((old) => old.filter((i) => i !== url));
    };

    const fetchImage = (count, orientation) => {
        const crop = orientation?.split("-")[0] === "landscape" ? "2000x900" : "900x2000";
        fetch(`https://source.unsplash.com/random/${crop}?sig=${count}`).then((res) =>
            setImages((old) => {
                if (old.includes(res.url)) {
                    // sometimes unsplash returns the same image
                    setCount((old) => old + 1);
                    return old;
                }
                return [res.url, ...old];
            })
        );
    };

    useEffect(() => {
        for (var i = 0; i < 5; i++) {
            fetchImage(i, orientation);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchImage(count, orientation);
    }, [count, orientation]);

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

export default App;
