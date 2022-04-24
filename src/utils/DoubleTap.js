const maxDelay = 300;
let lastTap = {};

export default function isDoubleTap(event) {
    const tap = {
        time: new Date().getTime(),
        target: event.currentTarget,
    };
    const isDoubleTap = tap.target === lastTap.target && tap.time - lastTap.time < maxDelay;
    lastTap = tap;
    return isDoubleTap;
}
