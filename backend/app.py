#!/usr/bin/python3
import socketio
from checkers.game import Game
from checkers.constants import DARK, LIGHT
from ai_engine.algorithm import minimax

sio = socketio.Server(cors_allowed_origins='http://localhost:3000')
app = socketio.WSGIApp(sio)

games = {}
playerColors = {}


@sio.event
def connect(sid, environ):
    print(sid, 'connected')


@sio.event
def disconnect(sid):
    global games
    print(f"{sid} disconnected")
    if sid in games.keys():
        games.pop(sid)


@sio.event
def select(sid, data):
    global games

    valid_moves = games[sid].select_piece(data["row"], data["col"])

    # print(valid_moves)

    return list(valid_moves.keys())

@sio.event
def is_over(sid):
    global games

    over =  games[sid].winner()

    if over != None:
        print(f'Game Over color {over} won')

    return -1 if over == None else over


@sio.event
def computer_move(sid):
    global games

    should_maximize = False if playerColors[sid] == LIGHT else True

    value, new_board = minimax(games[sid].get_board(), 5, float('-inf'), float('inf'), should_maximize)
    print(f"Value: {value}")
    games[sid].ai_move(new_board)
    return {"board": games[sid].get_board_state()}


@sio.event
def move(sid, data):
    global games

    is_move_correct = games[sid].move(data["row"], data["col"])

    if is_move_correct:
        return {"board": games[sid].get_board_state()}
    else:
        return {}


@sio.event
def join(sid, data):
    global games
    global playerColors

    playerColors[sid] = data["playerColor"]

    # print(playerColors[sid])
    games[sid] = Game()

    return {"board": games[sid].get_board_state()}
