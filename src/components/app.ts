import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("Simple Stack Overflow Clone");
})

export default app;
