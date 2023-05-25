import request from "supertest";
import server from "../../src";
// // import authRouter from "@routes/auth.route";
// // import profileRoute from "@routes/profile.route";


export async function createTestAccount(userInfo: { username: string, password: string, nickname: string }) : Promise<void> {
    const response = await request(server)
        .post('/api/my/account')
        .send(userInfo);
    if ( response.body.success === false ) {
        throw new Error(`register failed, response.body: ${JSON.stringify(response.body)}`);
    }
    return;
}

export async function deleteTestAccount(sessionHeader: string) : Promise<void> {
    const response = await request(server)
        .delete('/api/my/account')
        .set('Cookie', sessionHeader);

    if (response.body.success === false ) {
        throw new Error(`delete user failed, response.body: ${JSON.stringify(response.body)}`);
    }
    return;
}

function parseCookie(cookie: string) : string {
    return cookie.split('sessionid=')[1].split(';')[0];
}

export async function loginTestAccount(userInfo: { username: string, password: string }) : Promise<[string, string]> {
    const response = await request(server)
        .post('/api/auth/login')
        .send(userInfo);
    if ( response.body.success === false ) {
        throw new Error(`login failed, response.body: ${JSON.stringify(response.body)}`);
    }
    const sessionid = parseCookie(response.headers['set-cookie'][0]);
    const sessionHeader = `sessionid=${sessionid}`;
    return [sessionid, sessionHeader];
}

export async function createTestRoom(sessionHeader: string) : Promise<string> {
    const response = await request(server)
        .post("/api/my/rooms")
        .set('Cookie', sessionHeader);
    const roomid = response.body.roomid;
    if ( roomid === undefined ) {
        throw new Error(`create room failed, response.body: ${JSON.stringify(response.body)}`);
    }
    return roomid;
}

export async function deleteTestRoom(sessionHeader: string, roomid: string) : Promise<void> {
    const response = await request(server)
        .delete("/api/my/rooms")
        .set('Cookie', sessionHeader)
        .send({ roomid });
    if ( response.body.success === false ) {
        throw new Error(`delete room failed, response.body: ${JSON.stringify(response.body)}`);
    }
}