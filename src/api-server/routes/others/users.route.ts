import express from "express";

import { wrapAsyncController as wrap } from "@api-server/routes/helpers";
import { requireAuth, requireNotAuth } from "@api-server/middlewares/auth.middle.ware";
import { getUserInfos } from "@api-server/controllers/others/users.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getUserInfos));

export default router;