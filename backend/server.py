#!/usr/bin/python3
import socketio
import pythonGame

sio = socketio.Server(cors_allowed_origins='http://localhost:3000')
app = socketio.WSGIApp(sio)

games = {}


@sio.event
def connect(sid, environ):
    print(sid, 'connected')


@sio.event
def disconnect(sid):
    print(f"{sid} disconnected")
