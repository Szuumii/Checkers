package com.example.checkers.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.checkers.model.GameState;
import com.example.checkers.service.GameService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class GameController {

  private final GameService gameService;

  @RequestMapping(path = "/init")
  public GameState initGame(@RequestParam boolean isWhite) {
    return gameService.initGame(isWhite);
  }

  @PostMapping(path = "/update")
  public GameState update(@RequestBody GameState gameState) {
    return gameService.update(gameState);
  }

  @GetMapping(path = "/moves")
  public List<Integer[]> getMoves(@RequestParam int row,
                          @RequestParam int col) {
    return gameService.getMoves(row, col);
  }
}
