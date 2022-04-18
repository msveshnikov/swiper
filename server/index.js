import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { ALLOWED_ORIGIN, MONGODB_URI } from "./config.js";
import onError from "./onError.js";
import Event from "./Event.js";

const app = express();

app.use(
    cors({
        origin: ALLOWED_ORIGIN,
    })
);
app.use(express.json());

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Swiper API." });
});

/* This is a route handler. It is called when a POST request is made to the /event endpoint. It creates
a new event object and saves it to the database. */
app.post("/event", (req, res) => {
    // Validate request
    if (!req.body.eventType || !req.body.photoUrl || !req.body.userId) {
        return res.status(400).send({
            message: "Event type, photo url and user id are required.",
        });
    }

    const event = {
        ...req.body,
        createdAt: new Date(),
    };
    Event.create(event).catch(onError);
    return res.status(201).json(event);
});

app.use(onError);

try {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("🚀 Connected");
} catch (e) {
    onError(e);
}

const server = createServer(app);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});
