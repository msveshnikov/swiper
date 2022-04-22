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

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Swiper API." });
});

//get endpoint from mongodb query collection events
app.get("/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        onError(err, res);
    }
});

app.post("/event", (req, res) => {
    if (!req.body.eventType || !req.body.photoUrl || !req.body.userId) {
        return res.status(400).send({
            message: "eventType, photoUrl and userId are required.",
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
