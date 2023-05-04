import * as WebSocket from 'ws';
import * as url from 'url';

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket, req) => {

    const pathname = url.parse(req.url ?? '', true).pathname;
    if ( pathname === null ) {
        console.error(`user connection url: ${req.url}`);
        console.error('connection close');
        socket.close();
        return;
    }

    const token = pathname.replaceAll('/', '');
    
    socket.on('message', (message) => {
        message.
    })

});