import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new Schema(
    {
        eventType: {
            type: String,
            required: true,
        },
        photoUrl: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("Event", eventSchema);
