import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import server from "../../../src";
import { createTestAccount, createTestRoom, deleteTestAccount, deleteTestRoom, loginTestAccount } from "../helpers";

describe("test /my/members", () => {

    let credentials1 = {
        username: "__dev_test_my_members_username_1",
        password: "__dev_test_my_members_password_1",
        nickname: "__dev_test_my_members_nickname_1",
    }
    let credentials2 = {
        username: "__dev_test_my_members_username_2",
        password: "__dev_test_my_members_password_2",
        nickname: "__dev_test_my_members_nickname_2",
    }
    let credentials3 = {
        username: "__dev_test_my_members_username_3",
        password: "__dev_test_my_members_password_3",
        nickname: "__dev_test_my_members_nickname_3",
    }
    let roomid: string;
    let session: string;
    let sessionHeader: string;

    beforeAll(async () => {
        await createTestAccount(credentials1);
        await createTestAccount(credentials2);
        await createTestAccount(credentials3);
        [session, sessionHeader] = await loginTestAccount(credentials1);
        roomid = await createTestRoom(sessionHeader);
    })
    
    test("add friends", async () => {
        const response1 = await request(server)
            .post('/my/friends')
            .set('Cookie', sessionHeader)
            .send({ username: credentials2.username });
        const response2 = await request(server)
            .post('/my/friends')
            .set('Cookie', sessionHeader)
            .send({ username: credentials3.username });
        if ( response1.body.success === false || response2.body.success === false ) {
            throw new Error(`failed add friends. response1.body: ${JSON.stringify(response1.body)}, response2.body: ${JSON.stringify(response2.body)}`);
        }
    })

    test("GET /my/members", async () => {
        const response = await request(server)
            .get('/my/members')
            .set('Cookie', sessionHeader)
            .send({ roomid: roomid });
        expect(response.body).toMatchObject({
            status: 200,
            success: true,
            otherUserInfos: [
                {
                    username: credentials1.username
                }
            ]
        })
    })
    
    test("POST /my/members", async () => {
        const response = await request(server)
            .post('/my/members')
            .set('Cookie', sessionHeader)
            .send({ roomid: roomid, username: credentials2.username+','+credentials3.username });
        expect(response.body).toStrictEqual({
            status: 200,
            success: true
        })
    })

    test("GET /my/members after invite members", async () => {
        const response = await request(server)
            .get('/my/members')
            .set('Cookie', sessionHeader)
            .send({ roomid: roomid });
        expect(response.body).toMatchObject({
            status: 200,
            success: true,
            otherUserInfos: [
                { username: credentials1.username },
                { username: credentials2.username },
                { username: credentials3.username },
            ]
        })
    })

    
    afterAll(async () => {
        await deleteTestAccount(sessionHeader);
        await deleteTestAccount((await loginTestAccount(credentials2))[1]);
        await deleteTestAccount((await loginTestAccount(credentials3))[1]);
    })

})