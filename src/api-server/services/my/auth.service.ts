import LoginDB from "@databases/login";

export async function tryLogin(username: string, password: string) : Promise<Error | true> {
    const loginDB = await LoginDB.create();
    const result = await loginDB.tryLogin(username, password);
    await loginDB.close();
    if ( result === true ) {
        return true;
    } else {
        return new Error("not exist user");
    }
}

export default {
    tryLogin,
}