import { assertValue } from "./helpers";


export const loginDBConfig = {
    host: process.env.LOGIN_DB_HOST!,
    port: Number.parseInt(process.env.LOGIN_DB_PORT || "0"),
    user: process.env.LOGIN_DB_USER!,
    password: process.env.LOGIN_DB_PASSWORD!,
    database: process.env.LOGIN_DB_DATABASE!
};
assertValue(loginDBConfig, 'loginDBConfig', [undefined, NaN]);

export const mainDBConfig = {
    uri: process.env.MAIN_DB_URI!
}
assertValue(mainDBConfig, 'mainDBConfig');

export const chatDBConfig = {
    uri: process.env.CHAT_DB_URI!
}
assertValue(chatDBConfig, 'chatDBConfig');