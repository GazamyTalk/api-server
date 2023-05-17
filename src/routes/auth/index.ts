import express from "express";

import { wrapAsyncController as wrap } from "@routes/helpers";
import { requireAuth, requireNotAuth } from "@middlewares/auth.middle.ware";
import { login, logout } from "@controllers/auth.controller";


const router = express.Router();

router.post('/login', requireNotAuth, wrap(login));
router.post('/logout', requireAuth, wrap(logout));

export default router;