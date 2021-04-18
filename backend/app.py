#!/usr/bin/python3
import socketio
from checkers.game import Game

sio = socketio.Server(cors_allowed_origins='http://localhost:3000')
app = socketio.WSGIApp(sio)

games = {}
playerColors = {}


@sio.event
def connect(sid, environ):
    print(sid, 'connected')


@sio.event
def disconnect(sid):
    print(f"{sid} disconnected")


@sio.event
def select(sid, data):
    global games

    valid_moves = games[sid].select_piece(data["row"], data["col"])

    return list(valid_moves.keys())


@sio.event
def join(sid, data):
    global games
    global playerColors

    playerColors[sid] = data["playerColor"]

    # print(playerColors[sid])
    games[sid] = Game()

    return {"board": games[sid].get_board_state()}
