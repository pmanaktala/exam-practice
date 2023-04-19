import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Data = mongoose.model("animals", dataSchema);

export default Data;
