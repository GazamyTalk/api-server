import request from "supertest";

import appRouter from "@api-server/routes";
import { deleteUser } from "./helpers";


describe("/auth", () => {

    const loginCredentials = { username: "__dev_test_username", password: "__dev_test_password" };
    let sessionid: string;
    let cookieHeader: string;

    test("POST /login //before register", async () => {
        const response = await request(appRouter)
            .post('/auth/login')
            .send(loginCredentials);
        
        expect(response.body.status === 200).toBe(false);
    })

    test("POST /register", async () => {
        const response = await request(appRouter)
            .post('/auth/register')
            .send({ ...loginCredentials, nickname: "__dev_test_nickname" });
        
        expect(response.body.status).toBe(201);
        expect(response.body.sessionid).toBeDefined();
    })

    test("POST /login", async () => {
        const response = await request(appRouter)
            .post("/auth/login")
            .send(loginCredentials);
        
        expect(response.body.status).toBe(200);
        response.headers.get('set-cookie');

        cookieHeader = `Cookie: sessionid=${sessionid}`;
    })

    test("POST /logout", async () => {
        const response = await request(authRoute)
            .post("/logout")
            .send(loginCredentials);

        expect(response.body.status).toBe(200);
    })

    test("POST /logout //after logout", async () => {
        const response = await request(authRoute)
            .post('/logout')
            .send(loginCredentials);

        expect(response.body.status).toBe(409);
    })


    afterAll(async () => await deleteUser(sessionid));

})