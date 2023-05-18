import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import server from "../../../src";
import { createTestAccount, deleteTestAccount, loginTestAccount } from "../helpers";

describe("test /auth", () => {

    const loginCredentials = {
        username: "__dev_test_auth_username",
        password: "__dev_test_auth_password",
    }
    const credentials = {
        ...loginCredentials,
        nickname: "__dev_test_auth_nickname"
    }

    let session: string;
    let sessionHeader: string;


    beforeAll(async () => {
        await createTestAccount(credentials);
    })

    test("POST /auth/login", async () => {
        [session, sessionHeader] = await loginTestAccount(loginCredentials);
        expect(session === undefined).toBe(false);
    })

    test("POST /auth/logout", async () => {
        const response = await request(server)
            .post('/auth/logout')
            .set('Cookie', sessionHeader);
        expect(response.body).toStrictEqual({
            status: 200,
            success: true
        });
    })

    test("GET /my/account after logout", async () => {
        const response = await request(server)
            .get('/my/account')
            .set('Cookie', sessionHeader);
        expect(response.body).toStrictEqual({
            status: 401,
            success: false,
            error: "login first",
        })
    })

    afterAll(async () => {
        [session, sessionHeader] = await loginTestAccount(loginCredentials);
        await deleteTestAccount(sessionHeader);
    })

})