import { Request, Response } from "express";
import roomsService from "../../services/others/rooms.service";
import { RoomId } from "shared-db";

export async function getRoomInfos(req: Request, res: Response) {
    const roomidsRaw = req.body.roomid ?? req.query.roomid;
    
    if (!( typeof roomidsRaw === "string" )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }

    const roomids = roomidsRaw.split(',');
    const roomInfos = await roomsService.getRoomInfos(roomids.map((value) => new RoomId(value)));
    res.send({ status: 200, success: true, roomInfos: roomInfos });
}