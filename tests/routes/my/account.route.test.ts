import dotenv from "dotenv";
dotenv.config();

import server from "@server";
import request from "supertest";

import SharedDB from "shared-db";
import { mainDBConfig, loginDBConfig } from "@config/connection";
import { loginTestAccount } from "../helpers";

describe("test /my/account", () => {
    
    const credentials = {
        username: "__dev_test_my_account_username",
        password: "__dev_test_my_account_password",
        nickname: "__dev_test_my_account_nickname",
    }
    let session: string;
    let sessionHeader: string;

    
    test("GET /my/account without cookies", async () => {
        const response = await request(server).get("/my/account");
        expect(response.body.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe("login first");
    })
    
    
    test("POST /my/account", async () => {
        const response = await request(server)
            .post('/my/account')
            .send(credentials);
        expect(response.body.status).toBe(201);
        expect(response.body.success).toBe(true);

        [session, sessionHeader] = await loginTestAccount(credentials);
        // console.log('session:', session);
    });
    
    test("GET /my/account after create account", async () => {
        const response = await request(server)
            .get("/my/account")
            .set("Cookie", sessionHeader);
        // console.log(response.body);
        expect(response.body.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.userInfo.username).toBe(credentials.username);
        expect(response.body.userInfo.nickname).toBe(credentials.nickname);
        expect(response.body.userInfo.description).toBe("");
        expect(response.body.userInfo.userImage).toBe("tmpUserImagePath");
        expect(response.body.userInfo.rooms).toStrictEqual([]);
        expect(response.body.userInfo.friends).toStrictEqual([]);
    });


    test("PATCH /my/account", async () => {
        const response = await request(server)
            .patch("/my/account")
            .send({ patchData: { nickname: "__dev_test_my_account_nickname_patched", userImage: "__dev_test_my_account_userImage_patched" } })
            .set('Cookie', sessionHeader);
        // console.log(response.body);
        // console.log(response.headers);
        expect(response.body.status).toBe(200);
        expect(response.body.success).toBe(true);
    })

    test("GET /my/account after patch account", async () => {
        const response = await request(server)
            .get("/my/account")
            .set('Cookie', sessionHeader);
        // console.log(response.body);
        expect(response.body.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.userInfo.username).toBe(credentials.username);
        expect(response.body.userInfo.nickname).toBe("__dev_test_my_account_nickname_patched");
        expect(response.body.userInfo.userImage).toBe("__dev_test_my_account_userImage_patched");
    })


    test("DELETE /my/account", async () => {
        const response = await request(server)
            .delete("/my/account")
            .set('Cookie', sessionHeader);
        // expect(response.body.status).toBe(200);
        // expect(response.body.success).toBe(true);
        expect(response.body).toStrictEqual({
            status: 200,
            success: true
        })
    })

    test("GET /my/account after delete account", async () => {
        const response = await request(server).get('/my/account');
        expect(response.body).toStrictEqual({
            status: 401,
            success: false,
            error: "login first",
        })
    })

    // afterAll(async () => {  //debugging
    //     const sharedDB = await SharedDB.create({ mainDB: mainDBConfig, loginDB: loginDBConfig });
    //     await sharedDB.login.remove(credentials.username);
    //     await sharedDB.users.remove(credentials.username);
    //     await sharedDB.close();
    // })

});