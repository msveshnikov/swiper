import TinderCard from "react-tinder-card";
import Like from "./Like";
import Save from "./Save";
import Share from "./Share";
import isDoubleTap from "./DoubleTap";
import submitEvent from "./api";
import { useState } from "react";
import { useReward } from "react-rewards";

const Card = ({ url, onSwipe, onLeftScreen, card }) => {
    const [liked, setLiked] = useState(false);
    const { reward } = useReward("rewardId", "emoji", { zIndex: 10, lifetime: 70, startVelocity: 55, decay: 0.95 });

    const onTap = (e, url) => {
        if (isDoubleTap(e) && !liked) {
            setLiked(true);
            submitEvent(url, "like");
            reward();
        }
    };

    return (
        <TinderCard
            ref={card}
            onSwipe={(dir) => onSwipe(url, dir)}
            onCardLeftScreen={() => onLeftScreen(url)}
            className="swipe"
        >
            <div onTouchEnd={(e) => onTap(e, url)} style={{ backgroundImage: "url(" + url + ")" }} className="card">
                <Like liked={liked} setLiked={setLiked} reward={reward} url={url} />
                <Save url={url.split("?")[0]} />
                <Share url={url.split("?")[0]} />
            </div>
        </TinderCard>
    );
};

export default Card;
