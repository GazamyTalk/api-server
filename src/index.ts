import express from "express";
import http from 'http';

import errorHandler from "./middlewares/error.middleware";
import sessionMiddleware from "./middlewares/session.middleware";

import routes from "./routes";


const port = process.env.API_SERVER_PORT ?? 80;
const app = express();



app.use(sessionMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    //debugger
    console.log('-------------------------------');
    console.log('req.path:', req.path);
    console.log('req.method:', req.method);
    console.log('req.session:', req.session);
    console.log('req.headers:', req.headers);
    console.log('req.body:', req.body);
    next();
})

app.use('/api', routes);


app.use(errorHandler);



if ( require.main === module ) {
    app.listen(port, () => {
        console.log(`server is running at port ${port}`);
    })
}

export default app;