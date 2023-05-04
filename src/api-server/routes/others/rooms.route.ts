import express from "express";

import { wrapAsyncController as wrap } from "@api-server/routes/helpers";
import { requireAuth, requireNotAuth } from "@api-server/middlewares/auth.middle.ware";
import { getRoomInfos } from "@api-server/controllers/others/rooms.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getRoomInfos));

export default router;