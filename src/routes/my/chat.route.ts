import express from "express";

import { wrapAsyncController as wrap } from "../helpers";
import { requireAuth, requireNotAuth } from "../../middlewares/auth.middleware";
import { getChatInfos } from "../../controllers/my/chat.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getChatInfos));

export default router;