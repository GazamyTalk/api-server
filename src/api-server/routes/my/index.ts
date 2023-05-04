import express from "express";

import authRouter from "./auth.route";
import accountRouter from "./account.route";
import friendsRouter from "./friends.route";
import roomsRouter from "./rooms.route";
import membersRouter from "./members.route";
import chatRouter from "./chat.route";


const router = express.Router();

router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/friends', friendsRouter);
router.use('/rooms', roomsRouter);
router.use('/members', membersRouter);
router.use('/chat', chatRouter);

export default router;