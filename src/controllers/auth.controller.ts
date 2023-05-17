import { Request, Response } from "express";
import authService from "@services/auth.service";

export async function login(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;

    if (!(
        typeof username === "string" &&
        typeof password === "string"
    )) {
        res.send({ status: 400, success: false, error: "do not hack" });
        return;
    }

    const result = await authService.tryLogin(username, password);
    if ( result === true ) {
        req.session.username = username;
        req.session.save((err) => {
            if (err) throw err;
            res.send({ status: 200, success: true });
        });
        return;
    } else {
        res.send({ status: 400, success: false, error: result.message });
        return;
    }
}

export async function logout(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) throw err;
        res.send({ status: 200, success: true });
    })
}