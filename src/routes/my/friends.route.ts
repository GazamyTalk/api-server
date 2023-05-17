import express from "express";

import { wrapAsyncController as wrap } from "@routes/helpers";
import { requireAuth } from "@middlewares/auth.middle.ware";
import { getFriendsInfo, addFriend, removeFriend } from "@controllers/my/friends.controller";


const router = express.Router();

router.use(requireAuth);
router.get('/', wrap(getFriendsInfo));
router.post('/', wrap(addFriend));
router.delete('/', wrap(removeFriend));

export default router;