import express from "express";

import { wrapAsyncController as wrap } from "@api-server/routes/helpers";
import { requireAuth, requireNotAuth } from "@api-server/middlewares/auth.middle.ware";
import { getWSToken } from "@api-server/controllers/my/chat.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getWSToken));

export default router;