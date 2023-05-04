import DBClient from "@databases/index"

let dbClient: DBClient;
const credentials = {
    username: "__dev_test_username",
    password: "__dev_test_password"
}

beforeAll(async () => {
    dbClient = await DBClient.create();
})

describe("test login", () => {
    test("testLogin before register", async () => {
        const result = await dbClient.login.testLogin(credentials.username, credentials.password);

    })
})