package com.example.checkers.model;

import lombok.Data;

@Data
public class GameState {
  private int[][] board;
  private boolean isOver;
  private int winner;
  private boolean isWhite;

  public GameState(boolean isWhite) {
    this.board = initializeBoard();
    this.isWhite = isWhite;
    setupPieces(isWhite);
  }

  private int[][] initializeBoard() {
    int[][] board = new int[8][8];

    for (int i = 0; i < board.length; i++) {
      for (int j = 0; j < board[i].length; j++) {
        if(i % 2 == 0) {
          board[i][j] = (j % 2 == 0) ? -1 : 0;
        } else {
          board[i][j] = (j % 2 == 1) ? -1 : 0;
        }
      }
    }
    return board;
  }

  private void setupPieces(boolean isWhite) {
    int player;
    int ai;
    if(isWhite) {
      player = 1;
      ai = 3;
    } else {
      player = 3;
      ai = 1;
    }

    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < board[i].length; j++) {
        if(board[i][j] == 0) {
          board[i][j] = ai;
        }
      }
    }

    for (int i = 5; i < 8; i++) {
      for (int j = 0; j < board[i].length; j++) {
        if(board[i][j] == 0) {
          board[i][j] = player;
        }
      }
    }
  }
}
