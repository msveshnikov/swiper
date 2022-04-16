import { useState, useEffect, useRef } from "react";
import TinderCard from "react-tinder-card";
import Heart from "./Heart";
import Save from "./Save";
import "./App.css";
import isDoubleTap from "./DoubleTap";
import { useReward } from "react-rewards";
import useScreenOrientation from "react-hook-screen-orientation";

const App = () => {
    const [count, setCount] = useState(5);
    const [images, setImages] = useState([]);
    const [swiped, setSwiped] = useState([]);
    const [liked, setLiked] = useState(false);
    const screenOrientation = useScreenOrientation();
    const { reward } = useReward("rewardId", "emoji", { zIndex: 10, lifetime: 70, startVelocity: 55, decay: 0.95 });

    const onSwipe = (image) => {
        setSwiped((old) => [image, ...old]);
        setCount((old) => old + 1);
        setLiked(false);
    };

    const fetchImage = (i, screenOrientation) => {
        const crop = screenOrientation.split("-")[0] === "landscape" ? "2000x900" : "900x2000";
        fetch(`https://source.unsplash.com/random/${crop}?sig=${i}`).then((res) =>
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

    const onTap = (e) => {
        if (isDoubleTap(e) && !liked) {
            setLiked(true);
            reward();
        }
    };

    const card = useRef();

    useEffect(() => {
        window.addEventListener("keydown", function (e) {
            if (!card.current) return;
            switch (e.key) {
                case "ArrowLeft":
                    card.current.swipe("left");
                    break;
                case "ArrowUp":
                    card.current.swipe("up");
                    break;
                case "ArrowRight":
                    card.current.swipe("right");
                    break;
                case "ArrowDown":
                    card.current.swipe("down");
                    break;
                default:
            }
        });
    }, []);

    useEffect(() => {
        setImages([]);
        for (var i = 0; i < 5; i++) {
            fetchImage(i, screenOrientation);
        }
    }, [screenOrientation]);

    useEffect(() => {
        fetchImage(count, screenOrientation);
    }, [count, screenOrientation]);

    return (
        <div>
            <div className="cardContainer">
                {images.map((image) => (
                    <TinderCard
                        ref={!swiped.includes(image) ? card : null}
                        onSwipe={() => onSwipe(image)}
                        key={image}
                        className="swipe"
                    >
                        <div onTouchEnd={onTap} style={{ backgroundImage: "url(" + image + ")" }} className="card">
                            <Heart liked={liked} setLiked={setLiked} reward={reward} />
                            <Save url={image.split("?")[0]} />
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
};

export default App;
