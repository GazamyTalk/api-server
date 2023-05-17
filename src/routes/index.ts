import myRouter from "./my";
import othersRouter from "./others";
import authRouter from "./auth";
import express from "express";

const router = express.Router();
router.use('/my', myRouter);
router.use('/others', othersRouter);
router.use('/auth', authRouter);

export default router;