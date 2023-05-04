import mongoose from "mongoose";
import MainDB from "./main";

class DBs {

    mainDB?: MainDB
    chatDB?: ChatDB
    loginDB?: LoginDB
    wsTokenDB?: WSTokenDB

    constructor() {}

    async useUserDB() {
        if ( this.mainDB === undefined ) {
            this.mainDB = await MainDB.create();
        }
        return this;
    }
    
    async useRoomDB() {
        return await this.useUserDB();
    }

    async useChatDB() {
        if ( this.chatDB === undefined ) {
            this.chatDB = await ChatDB.create();
        }
        return this;
    }

    async useLoginDB() {
        if ( this.loginDB === undefined ) {
            this.loginDB = await LoginDB.create();
        }
        return this;
    }
    
    async useWSTokenDB() {
        if ( this.wsTokenDB === undefined ) {
            this.wsTokenDB = await WSTokenDB.create();
        }
        return this;
    }

    get users() {
        if ( this.mainDB === undefined ) {
            throw new Error("Unable to use 'users': mainDB is undefined");
        }
        return this.mainDB.users;
    }
    
    get rooms() {
        if ( this.mainDB === undefined ) {
            throw new Error("Unable to use 'users': mainDB is undefined");
        }
        return this.mainDB.rooms;
    }
    
    get chats() {
        if ( this.chatDB === undefined ) {
            throw new Error("Unable to use 'chats': chatDB is undefined");
        }
        return this.chatDB;
    }
    
    get login() {
        if ( this.loginDB === undefined ) {
            throw new Error("Unable to use 'login': loginDB is undefined");
        }
        return this.loginDB;
    }
    
    get wsTokens() {
        if ( this.wsTokenDB === undefined ) {
            throw new Error("Unable to use 'wsTokens': wsTokenDB is undefined");
        }
        return this.wsTokenDB;
    }

    async close() {
        this.mainDB && await this.mainDB.close();
        this.chatDB && await this.chatDB.close();
        this.loginDB && await this.loginDB.close();
        this.wsTokenDB && await this.wsTokenDB.close();
    }
}