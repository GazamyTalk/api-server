import { loginDBConfig } from "../config/connection";
import SharedDB from "shared-db";

export async function tryLogin(username: string, password: string) : Promise<Error | true> {
    const sharedDB = await SharedDB.create({ loginDB: loginDBConfig });
    const result = await sharedDB.login.tryLogin(username, password);
    await sharedDB.close();
    if ( result === true ) {
        return true;
    } else {
        return new Error("not exist user");
    }
}

export default {
    tryLogin,
}