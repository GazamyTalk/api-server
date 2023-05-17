import express from "express";

import { wrapAsyncController as wrap } from "@routes/helpers";
import { requireAuth, requireNotAuth } from "@middlewares/auth.middle.ware";
import { getChatInfos } from "@controllers/my/chat.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getChatInfos));

export default router;