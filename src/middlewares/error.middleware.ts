import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err); //debugger
    res.send({ status: 500, success: false, error: "server error" });
}

export default errorHandler;