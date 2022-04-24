import useEventListener from "@use-it/event-listener";

const Keys = ({ topCard }) => {
    const onKeyDown = (e) => {
        if (!topCard.current) return;
        switch (e.key) {
            case "ArrowLeft":
                topCard.current.swipe("left");
                break;
            case "ArrowUp":
                topCard.current.swipe("up");
                break;
            case "ArrowRight":
                topCard.current.swipe("right");
                break;
            case "ArrowDown":
                topCard.current.swipe("down");
                break;
            default:
        }
    };
    useEventListener("keydown", onKeyDown);
};

export default Keys;
