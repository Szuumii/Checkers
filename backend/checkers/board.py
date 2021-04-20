from .constants import ROWS, COLS, LIGHT, DARK
from .piece import Piece
from copy import deepcopy


class Board():
    def __init__(self):
        self.light_left = self.dark_left = 12
        self.light_kings = self.dark_kings = 0

        self.generate_board()

    def generate_board(self):
        self.board = []
        for i in range(ROWS):
            row = []
            for j in range(COLS):
                if i % 2 == 0:
                    color = - 1 if j % 2 == 0 else 0
                else:
                    color = - 1 if j % 2 == 1 else 0

                # set up pieces
                if i < 3 and color == 0:
                    field = Piece(i, j, LIGHT)
                elif i >= 5 and color == 0:
                    field = Piece(i, j, DARK)
                else:
                    field = Piece(i, j, color)

                row.append(field)
            self.board.append(row)

        # TEST CASES
        # self.board[4][3] = Piece(4, 3, LIGHT)
        # self.board[4][1] = Piece(4, 1, LIGHT)

        self.board[3][6] = Piece(3, 6, DARK)
        self.board[6][3] = Piece(6, 3, 0)
        # self.board[7][2] = Piece(7, 2, 0)

    def print_board(self) -> None:
        print(self.board)

    def get_board_state(self):
        return self.board

    def score(self):
        return self.light_left - self.dark_left + (self.light_kings * 2 - self.dark_kings * 2)

    def move(self, piece, row, col):
        self.board[piece.row][piece.col], self.board[row][col] = self.board[row][col], self.board[piece.row][piece.col]
        piece.move(row, col)

        if row == ROWS - 1 or row == 0:
            piece.make_king()

            if piece.color == LIGHT:
                self.light_kings += 1
            elif piece.color == DARK:
                self.dark_kings += 1

    def get_piece(self, row, col):
        return self.board[row][col]

    def remove(self, pieces: list):
        # print(f"Removing {pieces}")
        for element in pieces:
            # print(f"Removing row: {element[0]} col:{element[1]}")
            if self.board[element[0]][element[1]].color == LIGHT:
                # print("Removing LIGHT")
                self.light_left -= 1
            else:
                # print("Removing DARK")
                self.dark_left -= 1
            self.board[element[0]][element[1]] = Piece(
                element[0], element[1], 0)
            

    def winner(self):
        # Check if pieces left has a place to move
        if self.light_left <= 0:
            return DARK
        elif self.dark_left <= 0:
            return LIGHT
        else:
            return None

    def get_king_moves(self, piece):
        return []

    def get_all_pieces(self, color):
        pieces = []

        for row in self.board:
            for piece in row:
                if piece.color != 0 and piece.color != -1 and piece.color == color:
                    pieces.append(piece)

        return pieces

    def get_valid_moves(self, piece):
        moves = {}
        # moves[(move.row, move.col) = [[skipped1.row, skipped1.col]]]
        left = piece.col - 1
        right = piece.col + 1
        row = piece.row

        if piece.color == DARK or piece.king:
            moves.update(self._traverse_left(row - 1, max(row-3, -1), -1, piece.color, left))
            moves.update(self._traverse_right(row - 1, max(row-3, -1), -1, piece.color, right))
        if piece.color == LIGHT or piece.king:
            moves.update(self._traverse_left(row + 1, min(row+3, ROWS), 1, piece.color, left))
            moves.update(self._traverse_right(row + 1, min(row+3, ROWS), 1, piece.color, right))

        if not piece.king:
            if len(moves.items()) > 1:
                max_len = 0

                for move in moves:
                    if len(moves[move]) >= max_len:
                        max_len = len(moves[move])

                operational = deepcopy(moves)
                
                for move in moves:
                    if len(moves[move]) < max_len:
                        operational.pop(move)

                moves = operational
    
        return moves

        # moves = {}

        # left = piece.col - 1 if piece.col - 1 > 0 else 0
        # right = piece.col + 1 if piece.col + 1 < COLS else 7
        # row = piece.row


        # if piece.king is True:
        #     pass
        # else:
        #     next_row = row + piece.direction

        #     if self.board[next_row][left].color != 0 and self.board[next_row][left].color != -1 and self.board[next_row][left].color != piece.color:
        #         # print("Possible takeover left")
        #         row_further = next_row + piece.direction # CHange here idx out of range
        #         left_further = left - 1 if left - 1 > 0 else 0

        #         if self.board[row_further][left_further].color == 0:
        #             # print(
        #             # f"Checking if row: {row_further} col: {left_further} is empty")
        #             moves.update(
        #                 {(row_further, left_further): [(next_row, left)]})

        #     if self.board[next_row][right].color != 0 and self.board[next_row][right].color != -1 and self.board[next_row][right].color != piece.color:
        #         # print("Possible takeover right")
        #         row_further = next_row + piece.direction # CHange here
        #         right_further = right + 1 if right + 1 > 0 else 0

        #         if self.board[row_further][right_further].color == 0:
        #             # print(
        #             #     f"Checking if row: {row_further} col: {right_further} is empty")
        #             moves.update(
        #                 {(row_further, right_further): [(next_row, right)]})

        #     if not moves:
        #         # print(f"Checking row: {next_row} col:{left}")
        #         if self.board[next_row][left].color == 0:
        #             moves.update({(next_row, left): []})

        #         # print(f"Checking row: {next_row} col:{right}")
        #         if self.board[next_row][right].color == 0:
        #             moves.update({(next_row, right): []})

        # return moves

    def _traverse_left(self, start, stop, step, color, left, skipped=[]):
        moves = {}
        last = []
        for r in range(start, stop, step):
            if left < 0:
                break
            
            current = self.board[r][left]
            if current.color == 0:
                if skipped and not last:
                    break
                elif skipped:
                    moves[(r, left)] = last + skipped
                else:
                    moves[(r, left)] = last
                
                if last:
                    if step == -1:
                        row = max(r-3, 0)
                    else:
                        row = min(r+3, ROWS)
                    moves.update(self._traverse_left(r + step, row, step, color, left - 1,skipped=last))
                    moves.update(self._traverse_right(r + step, row, step, color, left + 1,skipped=last))
                break
            elif current.color == color:
                break
            else:
                last = [[current.row, current.col]]

            left -= 1
        
        return moves

    def _traverse_right(self, start, stop, step, color, right, skipped=[]):
        moves = {}
        last = []
        for r in range(start, stop, step):
            if right >= COLS:
                break
            
            current = self.board[r][right]
            if current.color == 0:
                if skipped and not last:
                    break
                elif skipped:
                    moves[(r,right)] = last + skipped
                else:
                    moves[(r, right)] = last
                
                if last:
                    if step == -1:
                        row = max(r-3, 0)
                    else:
                        row = min(r+3, ROWS)
                    moves.update(self._traverse_left(r+step, row, step, color, right-1,skipped=last))
                    moves.update(self._traverse_right(r+step, row, step, color, right+1,skipped=last))
                break
            elif current.color == color:
                break
            else:
                last = [[current.row, current.col]]

            right += 1
        
        return moves
