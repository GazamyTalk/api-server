import express from "express";

import { wrapAsyncController as wrap } from "@api-server/routes/helpers";
import { requireAuth, requireNotAuth } from "@api-server/middlewares/auth.middle.ware";
import { getRoomMemberInfos, addRoomMember } from "@api-server/controllers/my/members.controller";


const router = express.Router();

router.use(requireAuth);
router.get('/', wrap(getRoomMemberInfos));
router.post('/', wrap(addRoomMember));

export default router;