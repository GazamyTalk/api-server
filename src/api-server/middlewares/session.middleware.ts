import createNewStore from "@databases/session-store";
import session from "express-session";

declare module 'express-session' {
    interface SessionData {
        username: string
    }
}

const sessionMiddleware = session({
    secret: 'testsecret',
    name: 'sessionid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false
    },
    store: createNewStore()
})

export default sessionMiddleware;