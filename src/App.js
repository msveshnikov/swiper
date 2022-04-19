import { useState, useEffect, useRef } from "react";
import TinderCard from "react-tinder-card";
import Like from "./Like";
import Save from "./Save";
import "./App.css";
import isDoubleTap from "./DoubleTap";
import { useReward } from "react-rewards";
import useScreenOrientation from "react-hook-screen-orientation";
import useEventListener from "@use-it/event-listener";
import Share from "./Share";
import submitEvent from "./api";

const App = () => {
    const [count, setCount] = useState(5);
    const [images, setImages] = useState([]);
    const [swiped, setSwiped] = useState([]);
    const [liked, setLiked] = useState(false);
    const orientation = useScreenOrientation();
    const { reward } = useReward("rewardId", "emoji", { zIndex: 10, lifetime: 70, startVelocity: 55, decay: 0.95 });

    const onSwipe = (url, dir) => {
        setSwiped((old) => [url, ...old]);
        setLiked(false);
        submitEvent(url, "swipe " + dir);
        setCount((old) => old + 1);
    };

    const onLeftScreen = (url) => {
        setImages((old) => old.filter((i) => i !== url));
    };

    const fetchImage = (count, orientation) => {
        const crop = orientation.split("-")[0] === "landscape" ? "2000x900" : "900x2000";
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

    const onTap = (e, url) => {
        if (isDoubleTap(e) && !liked) {
            setLiked(true);
            submitEvent(url, "like");
            reward();
        }
    };

    const card = useRef();

    const onKeyDown = (e) => {
        if (!card.current) return;
        switch (e.key) {
            case " ":
                onTap(e); //TODO: fix url
                break;
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
    };
    useEventListener("keydown", onKeyDown);

    useEffect(() => {
        setImages([]);
        for (var i = 0; i < 5; i++) {
            fetchImage(i, orientation);
        }
    }, [orientation]);

    useEffect(() => {
        fetchImage(count, orientation);
    }, [count, orientation]);

    return (
        <div>
            <div className="cardContainer">
                {images.map((url) => (
                    <TinderCard
                        ref={swiped.includes(url) ? null : card}
                        onSwipe={(dir) => onSwipe(url, dir)}
                        onCardLeftScreen={() => onLeftScreen(url)}
                        key={url}
                        className="swipe"
                    >
                        <div onTouchEnd={(e) => onTap(e, url)} style={{ backgroundImage: "url(" + url + ")" }} className="card">
                            <Like liked={liked} setLiked={setLiked} reward={reward} url={url} />
                            <Save url={url.split("?")[0]} />
                            <Share url={url.split("?")[0]} />
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
};

export default App;
