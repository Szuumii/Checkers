from .constants import ROWS, COLS, LIGHT, DARK
from .piece import Piece


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

    def print_board(self) -> None:
        print(self.board)

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
        for element in pieces:
            piece = self.get_piece(element[0], element[1])
            if self.board[piece.row][piece.col].color != -1:
                self.board[piece.row][piece.col] = Piece(
                    piece.row, piece.col, 0)
                if piece.color == LIGHT:
                    self.light_left -= 1
                else:
                    self.dark_left -= 1

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

    def get_valid_moves(self, piece):
        moves = {}

        left = piece.col - 1 if piece.col - 1 > 0 else 0
        right = piece.col + 1 if piece.col + 1 < COLS else 7
        row = piece.row

        if piece.king is True:
            pass
        else:
            next_row = row + piece.direction

            if self.board[next_row][left].color != 0 and self.board[next_row][left].color != -1 and self.board[next_row][left].color != piece.color:
                # print("Possible takeover left")
                row_further = next_row + piece.direction
                left_further = left - 1 if left - 1 > 0 else 0

                if self.board[row_further][left_further].color == 0:
                    # print(
                    # f"Checking if row: {row_further} col: {left_further} is empty")
                    moves.update(
                        {(row_further, left_further): [(next_row, left)]})

            if self.board[next_row][right].color != 0 and self.board[next_row][right].color != -1 and self.board[next_row][right].color != piece.color:
                # print("Possible takeover right")
                row_further = next_row + piece.direction
                right_further = right + 1 if right + 1 > 0 else 0

                if self.board[row_further][right_further].color == 0:
                    # print(
                    #     f"Checking if row: {row_further} col: {right_further} is empty")
                    moves.update(
                        {(row_further, right_further): [(next_row, right)]})

            if not moves:
                # print(f"Checking row: {next_row} col:{left}")
                if self.board[next_row][left].color == 0:
                    moves.update({(next_row, left): []})

                # print(f"Checking row: {next_row} col:{right}")
                if self.board[next_row][right].color == 0:
                    moves.update({(next_row, right): []})

        return moves
