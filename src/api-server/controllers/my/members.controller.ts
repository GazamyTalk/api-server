import { Request, Response } from "express";

import membersService from "@api-server/services/my/members.service";
import { RoomId } from "@databases/main";

export async function getRoomMemberInfos(req: Request, res: Response) {
    const username = req.session.username!;
    const roomid = req.body.roomid;

    if (!( typeof roomid === "string" )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }
    
    const result = await membersService.getRoomMemberInfos(username, new RoomId(roomid));
    if ( result instanceof Error ) {
        res.send({ status: 400, success: false, error: result.message });
        return;
    } else {
        res.send({ status: 200, success: true, otherUserInfos: result });
        return;
    }
}

export async function addRoomMember(req: Request, res: Response) {
    const username = req.session.username!;
    const roomid = req.body.roomid;
    const friendname = req.body.friendname;

    if (!(
        typeof roomid === "string" &&
        typeof friendname === "string"
    )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }

    const result = await membersService.addRoomMember(username, new RoomId(roomid), friendname);
    if ( result === true ) {
        res.send({ status: 200, success: true });
        return;
    } else {
        res.send({ status: 400, success: false, error: result.message });
        return;
    }
}