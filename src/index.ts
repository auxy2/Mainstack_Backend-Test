import express from "express";


const app = express();

app.listen(4567, () => {
    console.log("App Started on port 4567");
})