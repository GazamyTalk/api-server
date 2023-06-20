import { Request, Response } from "express";
import chatService from "../../services/my/chat.service";
import { RoomId } from "shared-db";

export async function getChatInfos(req: Request, res: Response) {
    const username = req.session.username!;
    const roomid = req.query.roomid;
    const toDateTimeString = req.query.toDateTime!;
    const countString = req.query.count!;

    if (!(
        typeof roomid === "string" &&
        typeof toDateTimeString === "string" &&
        typeof countString === "string"
    )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }

    const toDateTime = Number.parseInt(toDateTimeString);
    const count = Number.parseInt(countString);

    if (!(
        !Number.isNaN(toDateTime) &&
        !Number.isNaN(count)
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