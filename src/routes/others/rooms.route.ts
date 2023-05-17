import express from "express";

import { wrapAsyncController as wrap } from "@routes/helpers";
import { requireAuth, requireNotAuth } from "@middlewares/auth.middle.ware";
import { getRoomInfos } from "@controllers/others/rooms.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getRoomInfos));

export default router;