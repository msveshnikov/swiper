/* This is a middleware function that is called when an error occurs. It is used to handle errors. */
export default function onError(err, req, res, next) {
    console.log(err);

    if (res) {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Something went wrong. Try again later";
        res.status(status).json({ message });
    }
}
