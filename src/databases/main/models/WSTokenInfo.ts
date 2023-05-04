import mongoose, { Document, Schema, Connection, Model } from "mongoose";
import buf2hex from "@api-server/utils/buf2hex";

export interface WSTokenInfo {
    username: string,
    token: string
}

const WSTokenInfoSchema = new Schema(
    {
        username: { type: String, require: true },
        token: { type: String, require: true, default: () => buf2hex(crypto.getRandomValues(new Uint8Array(12))) },
        createdAt: { type: Date, expires: 60, default: Date.now }
    }
)

export function createWSTokenInfoModel(connection: Connection): Model<WSTokenInfo> {
    return connection.model<WSTokenInfo>("WSTokenInfo", WSTokenInfoSchema);
}