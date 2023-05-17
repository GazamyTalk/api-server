import { Request, Response } from "express";
import chatService from "@services/my/chat.service";
import { RoomId } from "shared-db";

export async function getChatInfos(req: Request, res: Response) {
    const username = req.session.username!;
    const roomid = req.body.roomid;
    const toDateTime = req.body.toDateTime;
    const count = req.body.count;

    if (!(
        typeof roomid === "string" &&
        typeof toDateTime === "number" &&
        typeof count === "number"
    )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }

    const result = await chatService.getChatInfos(username, new RoomId(roomid), toDateTime, count);
    if ( result instanceof Error ) {
        res.send({ status: 400, success: false, error: result.message });
        return;
    } else {
        res.send({ status: 200, success: true, chatInfos: result });
        return;
    }
}