import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import { sessionConfig } from "../config/session";

declare module 'express-session' {
    interface SessionData {
        username: string
    }
}

let redisClient = createClient({ url: sessionConfig.url });
redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "gazamytalk:",
})

const sessionMiddleware = session({
    secret: sessionConfig.secret,
    name: 'sessionid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        domain: sessionConfig.domain,
        httpOnly: true,
        secure: false,
        maxAge: 3600 * 100
    },
    store: redisStore
})

export default sessionMiddleware;