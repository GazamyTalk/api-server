import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import server from "../../../src";
import { createTestAccount, deleteTestAccount, loginTestAccount } from "../helpers";
import { defaultImagePaths } from "../../../src/config/defaults";

describe("test /api/my/rooms", () => {

    const credentials = {
        username: "__dev_test_my_rooms_username",
        password: "__dev_test_my_rooms_password",
        nickname: "__dev_test_my_rooms_nickname",
    }

    let session: string;
    let sessionHeader: string;
    let roomid: string;


    beforeAll(async () => {
        await createTestAccount(credentials);
    })

    test("GET /api/my/rooms before login", async () => {
        const response = await request(server).get('/api/my/rooms');
        expect(response.body).toStrictEqual({
            status: 401,
            success: false,
            error: "login first"
        });
    })

    test("do login", async () => {
        [session, sessionHeader] = await loginTestAccount(credentials);
        expect(session === undefined).toBe(false);
    })

    test("GET /api/my/rooms", async () => {
        const response = await request(server)
            .get('/api/my/rooms')
            .set('Cookie', sessionHeader);
        expect(response.body).toMatchObject({
            status: 200,
            success: true,
            roomInfos: []
        })
    })

    test("POST /api/my/rooms", async () => {
        const response = await request(server)
            .post('/api/my/rooms')
            .set('Cookie', sessionHeader);
        expect(response.body).toMatchObject({
            status: 200,
            success: true
        })
        expect(response.body.roomid === undefined).toBe(false);
        roomid = response.body.roomid;
    })

    test("GET /api/my/rooms after create room", async () => {
        const response = await request(server)
            .get('/api/my/rooms')
            .set('Cookie', sessionHeader);
        expect(response.body).toMatchObject({
            status: 200,
            success: true,
            roomInfos: [
                {
                    roomid: roomid,
                    roomname: "",
                    description: "",
                    roomImage: defaultImagePaths.room,
                    users: [credentials.username]
                }
            ]
        })
    })

    test("PATCH /api/my/rooms", async () => {
        const response = await request(server)
            .patch('/api/my/rooms')
            .set('Cookie', sessionHeader)
            .send({ roomid: roomid, patchData: { roomname: "__dev_test_my_rooms_roomname", description: "__dev_test_my_rooms_description" } });
        expect(response.body).toStrictEqual({
            status: 200,
            success: true
        })
    })

    test("GET /api/my/rooms after patch", async () => {
        const response = await request(server)
            .get('/api/my/rooms')
            .set('Cookie', sessionHeader);
        expect(response.body).toMatchObject({
            status: 200,
            success: true,
            roomInfos: [
                {
                    roomid: roomid,
                    roomname: "__dev_test_my_rooms_roomname",
                    description: "__dev_test_my_rooms_description",
                    roomImage: defaultImagePaths.room,
                    users: [credentials.username]
                }
            ]
        })
    })

    test("DELETE /api/my/rooms", async () => {
        const response = await request(server)
            .delete('/api/my/rooms')
            .send({ roomid: roomid })
            .set('Cookie', sessionHeader);
        expect(response.body).toStrictEqual({
            status: 200,
            success: true
        });
    })

    test("GET /api/my/rooms after delete", async () => {
        const response = await request(server)
            .get('/api/my/rooms')
            .set('Cookie', sessionHeader);
        expect(response.body).toMatchObject({
            status: 200,
            success: true,
            roomInfos: [
            ]
        })
    })


    afterAll(async () => {
        await deleteTestAccount(sessionHeader);
    })

})