import { Request, Response } from "express";
import chatService from "@api-server/services/my/chat.service";

export async function getWSToken(req: Request, res: Response) {
    const username = req.session.username!;
    const token = await chatService.getWSToken(username);
    res.send({ status: 200, success: true, wsToken: token });
}