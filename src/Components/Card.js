import TinderCard from "react-tinder-card";
import Like from "./Like";
import Open from "./Open";
import Share from "./Share";
import isDoubleTap from "../utils/DoubleTap";
import { useState } from "react";
import { useReward } from "react-rewards";

const Card = ({ url, onSwipe, onLeftScreen, card }) => {
    const [liked, setLiked] = useState(false);

    const cleanUrl = url;

    const { reward } = useReward("rewardId", "emoji", { zIndex: 10, lifetime: 70, startVelocity: 45, decay: 0.95 });

    const onTap = (e, url) => {
        if (isDoubleTap(e) && !liked) {
            setLiked(true);
            reward();
        }
    };

    return (
        <TinderCard
            onSwipe={(dir) => onSwipe(url, dir)}
            onCardLeftScreen={() => onLeftScreen(url)}
            className="swipe"
            ref={card}
        >
            <div onTouchEnd={(e) => onTap(e, url)} style={{ backgroundImage: "url(" + url + ")" }} className="card">
                <Like liked={liked} setLiked={setLiked} reward={reward} url={cleanUrl} />
                <Open url={cleanUrl} />
                <Share url={cleanUrl} />
            </div>
        </TinderCard>
    );
};

export default Card;
