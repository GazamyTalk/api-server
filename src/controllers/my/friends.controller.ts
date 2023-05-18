import { Request, Response } from "express";

import friendsService from "../../services/my/friends.service";

export async function getFriendsInfo(req: Request, res: Response) {
    const username = req.session.username!;
    const friendsInfo = await friendsService.getFriendsInfo(username);
    res.send({ status: 200, success: true, otherUserInfos: friendsInfo });
}

export async function addFriend(req: Request, res: Response) {
    const username = req.session.username!;
    const friendname = req.body.username;
    const result = await friendsService.addFriend(username, friendname);
    if ( result === true ) {
        res.send({ status: 201, success: true });
        return;
    } else {
        res.send({ status: 400, success: false, error: result.message });
        return;
    }
}

export async function removeFriend(req: Request, res: Response) {
    const username = req.session.username!;
    const friendname = req.body.username;
    const result = await friendsService.removeFriend(username, friendname);
    if ( result === true ) {
        res.send({ status: 200, success: true });
        return;
    } else {
        res.send({ status: 400, success: true, error: result.message });
        return;
    }
}