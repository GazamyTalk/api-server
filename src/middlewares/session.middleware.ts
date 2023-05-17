import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import { sessionStoreConfig } from "@config/connection";

declare module 'express-session' {
    interface SessionData {
        username: string
    }
}

let redisClient = createClient({ url: sessionStoreConfig.url });
redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "gazamytalk:",
})

const sessionMiddleware = session({
    secret: 'testsecret',
    name: 'sessionid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 3600 * 100
    },
    store: redisStore
})

export default sessionMiddleware;