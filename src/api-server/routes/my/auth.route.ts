import express from "express";

import { wrapAsyncController as wrap } from "@api-server/routes/helpers";
import { requireAuth, requireNotAuth } from "@api-server/middlewares/auth.middle.ware";
import { login, logout } from "@api-server/controllers/my/auth.controller";


const router = express.Router();

router.post('/', requireNotAuth, wrap(login));
router.delete('/', requireAuth, wrap(logout));

export default router;