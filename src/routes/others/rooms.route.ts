import express from "express";

import { wrapAsyncController as wrap } from "../helpers";
import { requireAuth, requireNotAuth } from "../../middlewares/auth.middleware";
import { getRoomInfos } from "../../controllers/others/rooms.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getRoomInfos));

export default router;