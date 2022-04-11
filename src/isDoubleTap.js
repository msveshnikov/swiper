const doubleTapMaxDelay = 300;
let latestTap = {
    time: 0,
    target: null,
};

export default function isDoubleTap(event) {
    const touchTap = {
        time: new Date().getTime(),
        target: event.currentTarget,
    };
    const isDoubleTap = touchTap.target === latestTap.target && touchTap.time - latestTap.time < doubleTapMaxDelay;
    latestTap = touchTap;
    return isDoubleTap;
}
