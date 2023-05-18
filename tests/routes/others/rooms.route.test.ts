import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import server from "../../../src";
import { createTestAccount, createTestRoom, deleteTestAccount, loginTestAccount } from "../helpers";


describe("test /others/rooms", () => {

    let credentials1 = {
        username: "__dev_test_other_rooms_username_1",
        password: "__dev_test_other_rooms_password_1",
        nickname: "__dev_test_other_rooms_nickname_1",
    }
    let credentials2 = {
        username: "__dev_test_other_rooms_username_2",
        password: "__dev_test_other_rooms_password_2",
        nickname: "__dev_test_other_rooms_nickname_2",
    }
    let session1: string;
    let sessionHeader1: string;
    let session2: string;
    let sessionHeader2: string;
    let roomid1: string;
    let roomid2: string;

    beforeAll(async () => {
        await createTestAccount(credentials1);
        await createTestAccount(credentials2);
        [session1, sessionHeader1] = await loginTestAccount(credentials1);
        [session2, sessionHeader2] = await loginTestAccount(credentials2);
        roomid1 = await createTestRoom(sessionHeader2);
        roomid2 = await createTestRoom(sessionHeader2);
    })

    test("GET /others/rooms", async () => {
        const response = await request(server)
            .get('/others/rooms')
            .set('Cookie', sessionHeader1)
            .send({ roomid: roomid1+','+roomid2 });
        expect(response.body).toMatchObject({
            status: 200,
            success: true,
            roomInfos: [
                { roomid: roomid1 },
                { roomid: roomid2 }
            ]
        })
    })

    afterAll(async () => {
        await deleteTestAccount(sessionHeader1);
        await deleteTestAccount(sessionHeader2);
    })

})