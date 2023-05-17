import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import server from "@server";
import { createTestAccount, deleteTestAccount, loginTestAccount } from "../helpers";


describe("test /others/users", () => {

    let credentials1 = {
        username: "__dev_test_other_users_username_1",
        password: "__dev_test_other_users_password_1",
        nickname: "__dev_test_other_users_nickname_1",
    }
    let credentials2 = {
        username: "__dev_test_other_users_username_2",
        password: "__dev_test_other_users_password_2",
        nickname: "__dev_test_other_users_nickname_2",
    }
    let session: string;
    let sessionHeader: string;

    beforeAll(async () => {
        await createTestAccount(credentials1);
        await createTestAccount(credentials2);
        [session, sessionHeader] = await loginTestAccount(credentials1);
    })

    test("GET /others/users", async () => {
        const response = await request(server)
            .get('/others/users')
            .set('Cookie', sessionHeader)
            .send({ username: credentials1.username+','+credentials2.username });
        expect(response.body).toMatchObject({
            status: 200,
            success: true,
            otherUserInfos: [
                { username: credentials1.username },
                { username: credentials2.username }
            ]
        })
    })

    afterAll(async () => {
        await deleteTestAccount(sessionHeader);
        await deleteTestAccount((await loginTestAccount(credentials2))[1]);
    })

})