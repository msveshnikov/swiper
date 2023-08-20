import TinderCard from "react-tinder-card";
import Like from "./Like";
import Save from "./Save";
import Share from "./Share";
import isDoubleTap from "../utils/DoubleTap";
import { submitEvent } from "../utils/api";
import { useState } from "react";
import { useReward } from "react-rewards";

const Card = ({ url, onSwipe, onLeftScreen, card }) => {
    const [liked, setLiked] = useState(false);

    /* Removing the query string from the url, to Save, Share full image */
    const cleanUrl = url; //?.split("?")[0];

    const { reward } = useReward("rewardId", "emoji", { zIndex: 10, lifetime: 70, startVelocity: 45, decay: 0.95 });

    const onTap = (e, url) => {
        if (isDoubleTap(e) && !liked) {
            submitEvent(url, "like");
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
                <Save url={cleanUrl} />
                <Share url={cleanUrl} />
            </div>
        </TinderCard>
    );
};

export default Card;
