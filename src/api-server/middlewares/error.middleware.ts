import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send({ status: 500, success: false, context: "server error" });
}

export default errorHandler;