import dotenv from "dotenv";
dotenv.config()

import request from "supertest";
import server from "@server";
import { createTestAccount, createTestRoom, deleteTestAccount, loginTestAccount } from "../helpers";


describe("test /my/chat", () => {

    let session: string;
    let sessionHeader: string;
    let roomid: string;
    const credentials = {
        username: "__dev_test_my_chat_username",
        password: "__dev_test_my_chat_password",
        nickname: "__dev_test_my_chat_nickname",
    }

    beforeAll(async () => {
        await createTestAccount(credentials);
        [session, sessionHeader] = await loginTestAccount(credentials);
        roomid = await createTestRoom(sessionHeader);
    })

    test("GET /my/chat before add chat", async () => {
        const response = await request(server)
            .get('/my/chat')
            .set('Cookie', sessionHeader)
            .send({ roomid, toDateTime: Date.now(), count: 100 });
        expect(response.body).toStrictEqual({
            status: 200,
            success: true,
            chatInfos: []
        })
    })

    afterAll(async () => {
        await deleteTestAccount(sessionHeader);
    })

})