import express, { Request, Response } from "express";
import accountService from "@api-server/services/my/account.service";

export async function getAccount(req: Request, res: Response) {
    const username = req.session.username!;
    const account = await accountService.getAccount(username);
    res.send({ status: 200, success: true, account: account });
}

export async function createAccount(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const nickname = req.body.nickname;

    if (!(
        typeof username === "string" &&
        typeof password === "string" &&
        typeof nickname === "string"
    )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }

    const result = await accountService.createAccount(username, password, nickname);
    if ( result === true ) {
        res.send({ status: 201, success: true });
        return;
    } else {
        res.send({ status: 409, success: false, error: result.message });
    }
}

export async function patchAccount(req: Request, res: Response) {
    const username = req.session.username!;
    const patchData = req.body.patchData;

    if (!(
        typeof patchData === "object" &&
        accountService.isMutablePatchData(patchData)
    )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }

    await accountService.patchAccount(username, patchData);
    res.send({ status: 200, success: true });
}

export async function deleteAccount(req: Request, res: Response) {
    const username = req.session.username!;
    await accountService.deleteAccount(username);
    res.send({ status: 200, success: true });
}