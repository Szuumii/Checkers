from .constants import LIGHT


class Piece:
    def __init__(self, row: int, col: int, color: int):
        self.row = row
        self.col = col
        self.color = color
        self.king = False
        self.direction = 1 if color == LIGHT else -1

    def make_king(self):
        self.king = True

    def move(self, row, col):
        self.row = row
        self.col = col

    def __repr__(self):
        represenatation = self.color if self.king is not True else self.color + 1
        return str(represenatation)
