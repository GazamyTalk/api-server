import { assertValue } from "./helpers";

export const sessionConfig = {
    url: process.env.SESSION_STORE_URL!,
    secret: process.env.SESSION_SECRET!,
    domain: process.env.SERVER_DOMAIN!,
}
assertValue(sessionConfig, 'sessionConfig');
