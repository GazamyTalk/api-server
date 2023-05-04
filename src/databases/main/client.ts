import mongoose, { Connection, Model, UpdateQuery, FilterQuery } from "mongoose";

import { UserInfo, createUserInfoModel } from "./models/UserInfo";
import { RoomInfo, createRoomInfoModel, RoomId } from "./models/RoomInfo";
import { WSTokenInfo, createWSTokenInfoModel } from "./models/WSTokenInfo";
import { mainDBConfig } from "@config/databases";

export { UserInfo };
export { RoomInfo, RoomId };
export { WSTokenInfo };


export class UserClient {
    private UserInfoModel: Model<UserInfo>

    constructor(connection: Connection) {
        this.UserInfoModel = createUserInfoModel(connection);
    }

    async insert(userInfo: Partial<UserInfo>) : Promise<void> {
        const result = await this.UserInfoModel.create(userInfo);
    }

    async update(beforeUserInfo: FilterQuery<Partial<UserInfo>>, afterUserInfo: Partial<UpdateQuery<UserInfo>>) : Promise<number> {
        const result = await this.UserInfoModel.updateMany(beforeUserInfo, afterUserInfo);
        return result.matchedCount;
    }

    async updateOne(beforeUserInfo: FilterQuery<Partial<UserInfo>>, afterUserInfo: Partial<UpdateQuery<UserInfo>>) : Promise<void> {
        const result = await this.UserInfoModel.updateOne(beforeUserInfo, afterUserInfo);
        if ( result.matchedCount !== 1 ) {
            throw new Error("nothing was matched.");
        }
    }

    async delete(userInfo: FilterQuery<Partial<UserInfo>>) : Promise<number> {
        const result = await this.UserInfoModel.deleteMany(userInfo);
        return result.deletedCount;
    }

    async deleteOne(userInfo: FilterQuery<Partial<UserInfo>>) : Promise<void> {
        const result = await this.UserInfoModel.deleteOne(userInfo);
        if ( result.deletedCount !== 1 ) {
            throw new Error("nothing was deleted.");
        }
    }

    async select(userInfo: FilterQuery<Partial<UserInfo>>) : Promise<UserInfo[]> {
        const result: UserInfo[] = await this.UserInfoModel.find(userInfo);
        return result;
    }

    async selectOne(userInfo: FilterQuery<Partial<UserInfo>>) : Promise<UserInfo> {
        const result: UserInfo | null = await this.UserInfoModel.findOne(userInfo);
        if ( result === null ) {
            throw new Error("selectOne must have one result, but no result");
        }
        return result;
    }
}


export class RoomClient {
    private RoomInfoModel: Model<RoomInfo>
    
    constructor(connection: Connection) {
        this.RoomInfoModel = createRoomInfoModel(connection);
    }

    async insert(roomInfo: Partial<RoomInfo>) : Promise<RoomId> {
        const result = await this.RoomInfoModel.create(roomInfo);
        return result.roomid;
    }

    async update(beforeRoomInfo: FilterQuery<Partial<RoomInfo>>, afterRoomInfo: UpdateQuery<Partial<RoomInfo>>) : Promise<number> {
        const result = await this.RoomInfoModel.updateMany(beforeRoomInfo, afterRoomInfo);
        return result.matchedCount;
    }

    async updateOne(beforeRoomInfo: FilterQuery<Partial<RoomInfo>>, afterRoomInfo: UpdateQuery<Partial<RoomInfo>>) : Promise<void> {
        const result = await this.RoomInfoModel.updateOne(beforeRoomInfo, afterRoomInfo);
        if ( result.matchedCount !== 1 ) {
            throw new Error("nothing was matched.");
        }
    }

    async delete(roomInfo: FilterQuery<Partial<RoomInfo>>) : Promise<number> {
        const result = await this.RoomInfoModel.deleteMany(roomInfo);
        return result.deletedCount;
    }

    async deleteOne(roomInfo: FilterQuery<Partial<RoomInfo>>) : Promise<void> {
        const result = await this.RoomInfoModel.deleteOne(roomInfo);
        if ( result.deletedCount !== 1 ) {
            throw new Error("nothing was deleted.");
        }
    }

    async select(roomInfo: FilterQuery<Partial<RoomInfo>>) : Promise<RoomInfo[]> {
        const result: RoomInfo[] = await this.RoomInfoModel.find(roomInfo);
        return result;
    }

    async selectOne(roomInfo: FilterQuery<Partial<RoomInfo>>) : Promise<RoomInfo> {
        const result: RoomInfo | null = await this.RoomInfoModel.findOne(roomInfo);
        if ( result === null ) {
            throw new Error("selectOne must have one result, but no result");
        }
        return result;
    }
}


export class WSTokenClient {
    private WSTokenModel: Model<WSTokenInfo>

    constructor(connection: Connection) {
        this.WSTokenModel = createWSTokenInfoModel(connection);
    }

    async insert(wsTokenInfo: Partial<WSTokenInfo>) : Promise<WSTokenInfo> {
        const result = await this.WSTokenModel.create(wsTokenInfo);
        return result;
    }

    async delete(wsTokenInfo: FilterQuery<Partial<WSTokenInfo>>) : Promise<number> {
        const result = await this.WSTokenModel.deleteMany(wsTokenInfo);
        return result.deletedCount;
    }

    async deleteOne(wsTokenInfo: FilterQuery<Partial<WSTokenInfo>>) : Promise<void> {
        const result = await this.WSTokenModel.deleteOne(wsTokenInfo);
        if ( result.deletedCount !== 1 ) {
            throw new Error("nothing was deleted.");
        }
    }

    async select(wsTokenInfo: FilterQuery<Partial<WSTokenInfo>>) : Promise<WSTokenInfo[]> {
        const result = await this.WSTokenModel.find(wsTokenInfo);
        return result;
    }

    async selectOne(wsTokenInfo: FilterQuery<Partial<WSTokenInfo>>) : Promise<WSTokenInfo> {
        const result = await this.WSTokenModel.findOne(wsTokenInfo);
        if ( result === null ) {
            throw new Error("selectOne must have one result, but no result");
        }
        return result;
    }
}


export default class MainDBClient {
    public userClient: UserClient
    public roomClient: RoomClient
    public wsTokenClient: WSTokenClient
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
        this.userClient = new UserClient(this.connection);
        this.roomClient = new RoomClient(this.connection);
        this.wsTokenClient = new WSTokenClient(this.connection);
    }

    static async create() : Promise<MainDBClient> {
        return new MainDBClient(await mongoose.createConnection(mainDBConfig.uri))
    }

    async close() : Promise<void> {
        this.connection.close();
    }

}