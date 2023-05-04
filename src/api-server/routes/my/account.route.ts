import express from "express";

import { wrapAsyncController as wrap } from "@api-server/routes/helpers";
import { requireAuth, requireNotAuth } from "@api-server/middlewares/auth.middle.ware";
import { getAccount, createAccount, patchAccount, deleteAccount } from "@api-server/controllers/my/account.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getAccount));
router.post('/', requireNotAuth, wrap(createAccount));
router.patch('/', requireAuth, wrap(patchAccount));
router.delete('/', requireAuth, wrap(deleteAccount));

export default router;