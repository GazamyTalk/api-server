import { Request, Response } from "express";
import usersService from "@api-server/services/others/users.service";

export async function getUserInfos(req: Request, res: Response) {
    const usernamesRaw = req.body.username ?? req.query.username;

    if (!( typeof usernamesRaw === "string" )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }

    const usernames = usernamesRaw.split(',');
    const userInfos = await usersService.getUserInfos(usernames);
    res.send({ status: 200, success: true, otherUserInfos: userInfos })
}