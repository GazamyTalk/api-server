import express from "express";
import http from 'http';

import errorHandler from "./middlewares/error.middleware";
import sessionMiddleware from "./middlewares/session.middleware";
import { useSocketServer } from "./websockets";

import myRouter from "./routes/my";
import othersRouter from "./routes/others";


const port = process.env.API_SERVER_PORT ?? 80;
const app = express();
const server = http.createServer(app);



app.use(sessionMiddleware);


app.use('/my', myRouter);
app.use('/others', othersRouter);
useSocketServer('/ws', server);


app.use(errorHandler);



if ( require.main === module ) {
    server.listen(port, () => {
        console.log(`server is running at port ${port}`);
    })
}

export default app;