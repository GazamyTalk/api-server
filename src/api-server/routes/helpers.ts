import { Request, Response, NextFunction } from "express";

export function wrapAsyncController(asyncFn: Function) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await asyncFn(req, res, next);
        } catch (err) {
            return next(err);
        }
    }
}