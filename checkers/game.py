from .board import Board
from .constants import LIGHT, DARK


class Game:
    def __init__(self):
        self._init()

    def update(self):
        pass

    def show_board(self):
        self.board.print_board()

    def _init(self):
        self.selected = None
        self.board = Board()
        self.turn = LIGHT
        self.valid_moves = {}

    def resest(self):
        self._init()

    def select_piece(self, row, col):
        self.selected = self.board.get_piece(row, col)
        if not self.selected.color == self.turn:
            self.selected = None
            return {}
        else:
            self.valid_moves = self.board.get_valid_moves(self.selected)
            return self.valid_moves

    def move(self, row, col):
        destination = self.board.get_piece(row, col)
        if self.selected and destination.color == 0 and (row, col) in self.valid_moves:
            self.board.move(self.selected, row, col)
            skipped = self.valid_moves[(row, col)]
            if skipped:
                self.board.remove(skipped)
            self.change_turn()
        else:
            return False

        return True

    def change_turn(self):
        self.turn = DARK if self.turn == LIGHT else LIGHT

    def winner(self):
        return self.board.winner()
