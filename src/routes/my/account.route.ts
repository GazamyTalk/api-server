import express from "express";

import { wrapAsyncController as wrap } from "@routes/helpers";
import { requireAuth, requireNotAuth } from "@middlewares/auth.middle.ware";
import { getAccount, createAccount, patchAccount, deleteAccount } from "@controllers/my/account.controller";


const router = express.Router();

router.get('/', requireAuth, wrap(getAccount));
router.post('/', requireNotAuth, wrap(createAccount));
router.patch('/', requireAuth, wrap(patchAccount));
router.delete('/', requireAuth, wrap(deleteAccount));

export default router;