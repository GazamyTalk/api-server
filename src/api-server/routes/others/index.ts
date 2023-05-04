import express from "express";

import roomsRouter from "./rooms.route";
import usersRouter from "./users.route";

const router = express.Router();

router.use('/rooms', roomsRouter);
router.use('/users', usersRouter);

export default router;