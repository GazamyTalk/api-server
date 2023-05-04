import { Server, Socket } from 'socket.io';
import http, { Server as HTTPServer } from "http";

import url from "url";

import sessionMiddleware from '@api-server/middlewares/session.middleware';

import express, { Request, NextFunction, Express } from "express";


export function useSocketServer(path: string, app: Express, server: HTTPServer) {
  const io = new Server(server, { path });

  io.on('connection', (socket: Socket) => {

    const req = socket.request as Request;
    const pathname = url.parse(req.url ?? '', true).pathname;
    if ( pathname === null ) {
        console.error(`user connection url: ${req.url}`);
        console.error('connection close');
        socket.disconnect(true);
        return;
    }

    socket.on('chat message', (msg) => {
      socket.emit()
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
}