const doubleTapMaxDelay = 300;
let latestTap = {
    time: 0,
    target: null,
};

export default function isDoubleTap(event) {
    const tap = {
        time: new Date().getTime(),
        target: event.currentTarget,
    };
    const isDoubleTap = tap.target === latestTap.target && tap.time - latestTap.time < doubleTapMaxDelay;
    latestTap = tap;
    return isDoubleTap;
}
