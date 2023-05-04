import request from "supertest";
import authRouter from "@api-server/routes/auth.route";
import profileRoute from "@api-server/routes/profile.route";


export async function createUser(username?: string) : Promise<{ sessionid: string, cookieHeader: string }> {
    username = username ?? "__dev_test_username";
    const password = "__dev_test_password";
    const response = await request(authRouter)
        .post('/register')
        .send({ username, password });

    const sessionid = response.body.sessionid;
    if (sessionid === undefined) {
        throw new Error("sessionid is undefined");
    }
    const cookieHeader = `Cookie: sessionid=${sessionid}`;
    return { sessionid, cookieHeader };
}

export async function deleteUser(cookieHeader: string) {
    const response = await request(profileRoute)
        .delete('/')
        .expect(cookieHeader);

    if (response.body.status !== 200) {
        throw new Error("Error raised while delete testing user. response: ")
    }
}