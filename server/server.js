import express, {json} from 'express';
import cors from "cors";
import {MongoClient} from 'mongodb';
import Data from "./data.js";
import mongoose from "mongoose";

const app = express();

mongoose
    .connect(
        "mongodb+srv://admin:admin@cluster0.3ajqdqe.mongodb.net/final?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

//Use a database named "final"
//Use a collection named "animals"

app.use(cors());
app.use(express.json());

//upload route

app.post("/upload", (req, res) => {
    const {name, url} = req.body;
    const data = new Data({name, url});

    console.log(data);

    data
        .save()
        .then(() => res.status(201).send("Success"))
        .catch((err) => res.status(500).send(err.message));
});

//search route

app.get("/search/:animal", async (req, res) => {
    let name = req.params.animal;
    const animal = await Data.findOne({name});

    if (animal) {
        res.status(200).json(animal);
    } else {
        res.status(404).send("Not Found");
    }
});


//clear route

app.delete("/delete", async (req, res) => {
    await Data.deleteMany({}).then(() => res.status(201).send({message: "Deleted Successfully"}))
        .catch((err) => res.status(500).send(err.message));

});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//npm run dev to start React app and Express server