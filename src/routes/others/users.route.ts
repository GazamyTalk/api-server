import express from "express";

import { wrapAsyncController as wrap } from "@routes/helpers";
import { requireAuth, requireNotAuth } from "@middlewares/auth.middle.ware";
import { getUserInfos } from "@controllers/others/users.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getUserInfos));

export default router;