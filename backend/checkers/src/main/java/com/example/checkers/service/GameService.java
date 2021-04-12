package com.example.checkers.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.checkers.model.GameState;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameService {

  private GameState gameState;

  public GameState initGame(boolean isWhite) {
    if(isWhite) {
      gameState = new GameState(isWhite);
    }

    return gameState;
  }

  public GameState update(final GameState gameState) {
    validateGameState(gameState);

    this.gameState = gameState;

    // move

    return this.gameState;
  }

  public List<Integer[]> getMoves(final int row, final int col) {
    validatePosition(row, col);
    List<Integer[]> possibleMoves = new ArrayList<>();
    if(gameState.getBoard()[row][col] == 1) {
      if((row - 1 > 0 && row - 1 < 8) && (col - 1 > 0 && col - 1 < 8)) {
        if(gameState.getBoard()[row - 1][col - 1] == 0) {
          possibleMoves.add(new Integer[]{row - 1, col -1});
        }
        //TODO bicie
      } else if((row - 1 > 0 && row - 1 < 8) && (col + 1 < 8)) {
        if(gameState.getBoard()[row - 1][col + 1] == 0) {
          possibleMoves.add(new Integer[]{row - 1, col +1});
        }
        //TODO bicie
      }
    } else{
      //TODO król
    }
    return possibleMoves;

  }

  private void validatePosition(final int row, final int col) {
    if(row < 0 || row > 7 || col < 0 || col > 7) {
      throw new RuntimeException("Wrong position.");
    }
  }

  private void validateGameState(GameState gameState) {
    int[][] board = gameState.getBoard();

    int sum = 0;

    for(int i = 0; i < board.length; i++) {
      for (int j = 0; j < board[i].length; j++) {
        if(board[i][j] == -1) {
          sum++;
        }
      }
    }

    if(sum != 32) {
      throw new RuntimeException("Wrong game state.");
    }
  }
}
