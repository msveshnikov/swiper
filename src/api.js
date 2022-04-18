const API_URL = "https://api.swiper.ml";

/**
 * It fetches the IP address of the user and returns it
 * @returns The IP address of the user.
 */
const getIp = async () => {
    const res = await fetch("https://geolocation-db.com/json/");
    const body = await res.json();
    return body.IPv4;
};

/**
 * It takes a URL and an event type, and sends a POST request to the API with the URL and event type,
 * along with the user's IP address
 * @param url - The URL of the Unsplash image
 * @param type - The type of event you want to track.
 */
const submitEvent = async (url, type) => {
    const event = {
        photoUrl: url,
        userId: await getIp(),
        eventType: type,
    };

    await fetch(API_URL + "/event", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export default submitEvent;
