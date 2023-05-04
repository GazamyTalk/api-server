import { Request, Response } from "express";
import roomsService, { isMutablePatchData } from "@api-server/services/my/rooms.service";
import { RoomId } from "@databases/main";

export async function getRoomInfos(req: Request, res: Response) {
    const username = req.session.username!;
    const roomInfos = await roomsService.getRoomInfos(username);
    res.send({ status: 200, success: true, roomInfos: roomInfos });
}

export async function enterRoom(req: Request, res: Response) {
    const username = req.session.username!;
    const roomid = req.body.roomid;

    if ( !(
        typeof roomid === "string" ||
        typeof roomid === "undefined"
    )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }
    
    const result = await roomsService.enterRoom(username, roomid ? new RoomId(roomid) : undefined);
    if ( result === true ) {
        res.send({ status: 200, success: true, roomid: roomid });
        return;
    } else {
        res.send({ status: 400, success: false, error: result.message });
        return;
    }
}

export async function patchRoom(req: Request, res: Response) {
    const username = req.session.username!;
    const roomid = req.body.roomid;
    const patchData = req.body.patchData;

    if (!(
        typeof roomid === "string" &&
        typeof patchData === "object" &&
        isMutablePatchData(patchData)
    )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }

    const result = await roomsService.patchRoom(username, new RoomId(roomid), patchData);
    if ( result === true ) {
        res.send({ status: 200, success: true });
        return;
    } else {
        res.send({ status: 400, success: false, error: result.message });
        return;
    }
}

export async function exitRoom(req: Request, res: Response) {
    const username = req.session.username!;
    const roomid = req.body.roomid;

    if (!( typeof roomid === "string" )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }

    const result = await roomsService.exitRoom(username, new RoomId(roomid));
    if ( result === true ) {
        res.send({ status: 200, success: true });
        return;
    } else {
        res.send({ status: 400, success: false, error: result.message });
        return;
    }
}