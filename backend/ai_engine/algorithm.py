from copy import deepcopy

LIGHT, DARK = 1, 3


def minimax(position, depth, alpha, beta, max_player):
    if depth == 0 or position.winner() != None:
        return position.score(), position

    if max_player:
        maxEval = float('-inf')
        best_move = None
        for move in get_all_moves(position, LIGHT):
            evaluation = minimax(move, depth - 1, alpha, beta, False)[0]
            if evaluation >= maxEval:
                maxEval = evaluation
                best_move = move
            print(f"Max eval is {maxEval}")
            alpha = max(alpha, evaluation)
            if beta <= alpha:
                # print("Pruned!")
                break

        return maxEval, best_move
    else:
        minEval = float('inf')
        best_move = None
        for move in get_all_moves(position, DARK):
            evaluation = minimax(move, depth - 1, alpha, beta, True)[0]
            if evaluation <= minEval:
                minEval = evaluation
                best_move = move
            print(f"Min eval is {minEval}")
            beta = min(beta, evaluation)
            if beta <= alpha:
                # print("Pruned!")
                break
            

        return minEval, best_move

def get_all_moves(board, color):
    moves = []

    for piece in board.get_all_pieces(color):
        valid_moves = board.get_valid_moves(piece)
        for move, skip in valid_moves.items():
            temp_board = deepcopy(board)
            temp_piece = temp_board.get_piece(piece.row, piece.col)
            new_board = simulate_move(temp_board, temp_piece, move, skip)
            moves.append(new_board)

    return moves

def simulate_move(board, piece, move, skip):
    board.move(piece, move[0], move[1])
    if skip:
        board.remove(skip)

    return board