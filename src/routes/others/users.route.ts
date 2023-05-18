import express from "express";

import { wrapAsyncController as wrap } from "../helpers";
import { requireAuth, requireNotAuth } from "../../middlewares/auth.middleware";
import { getUserInfos } from "../../controllers/others/users.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getUserInfos));

export default router;