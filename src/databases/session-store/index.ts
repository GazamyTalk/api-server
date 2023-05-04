import session from "express-session"
import connectRedis from "connect-redis"
import { sessionStoreConfig } from "@config/databases"

const RedisStore = connectRedis(session)

export default function createNewStore() {
    return new RedisStore(sessionStoreConfig);
}