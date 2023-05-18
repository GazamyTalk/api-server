import express from "express";

import { wrapAsyncController as wrap } from "../helpers";
import { requireAuth } from "../../middlewares/auth.middleware";
import { getRoomInfos, enterRoom, exitRoom, patchRoom } from "../../controllers/my/rooms.controller";


const router = express.Router();

router.use(requireAuth);
router.get('/', wrap(getRoomInfos));
router.post('/', wrap(enterRoom));
router.patch('/', wrap(patchRoom))
router.delete('/', wrap(exitRoom));

export default router;