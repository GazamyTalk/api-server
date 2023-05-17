import express from "express";

import { wrapAsyncController as wrap } from "@routes/helpers";
import { requireAuth, requireNotAuth } from "@middlewares/auth.middle.ware";
import { getRoomMemberInfos, addRoomMember } from "@controllers/my/members.controller";


const router = express.Router();

router.use(requireAuth);
router.get('/', wrap(getRoomMemberInfos));
router.post('/', wrap(addRoomMember));

export default router;