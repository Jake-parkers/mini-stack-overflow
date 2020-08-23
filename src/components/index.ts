import express from "express";
import users from "./users";

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send("Mini Stack Overflow Clone");
});

router.use('/users', users);

export default router;