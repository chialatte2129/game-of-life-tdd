// import { mock } from "jest-mock-extended";

import { BoardType } from "../src/board/board_type";
import { MainBoard } from "../src/board/main_board";

// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

describe("Main Board", () => {
  let board: BoardType = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ];

  it("should return [1][1] next status of dies, which  live cell have fewer 2 live neighbor", () => {
    const board_calculate: MainBoard = new MainBoard(board);
    const result: string = board_calculate.getNextStatus(1, 1);
    expect(result).toBe("dies");
  });

  it("should return [2][1] next status of lives, which  live cell have 2~3 live neighbor", () => {
    const board_calculate: MainBoard = new MainBoard(board);
    const result: string = board_calculate.getNextStatus(2, 1);
    expect(result).toBe("lives");
  });

  let board_2: BoardType = [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
  ];

  it("should return [2][1] next status of dies, which  live cell have more then 3 live neighbor", () => {
    const board_calculate: MainBoard = new MainBoard(board_2);
    const result: string = board_calculate.getNextStatus(2, 1);
    expect(result).toBe("dies");
  });

  it("should return [0][1] next status of lives, which dead cell have exact 3 live neighbor", () => {
    const board_calculate: MainBoard = new MainBoard(board_2);
    const result: string = board_calculate.getNextStatus(0, 1);
    expect(result).toBe("lives");
  });

  let initBoard: BoardType = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  it("should return [1][2] next status of lives, which  live cell have exact 3 live neighbor", () => {
    const board_calculate: MainBoard = new MainBoard(initBoard);
    const result: string = board_calculate.getNextStatus(1, 2);
    expect(result).toBe("lives");
  });

  it("should return [3][2] next status of lives, which  live cell have exact 3 live neighbor", () => {
    const board_calculate: MainBoard = new MainBoard(initBoard);
    const result: string = board_calculate.getNextStatus(3, 2);
    expect(result).toBe("lives");
  });

  it("should return [2][1] next status of dies, which  live cell have fewer 2 live neighbor", () => {
    const board_calculate: MainBoard = new MainBoard(initBoard);
    const result: string = board_calculate.getNextStatus(2, 1);
    expect(result).toBe("dies");
  });

  it(`should return new board after one iterate`, () => {
    const board_calculate: MainBoard = new MainBoard(initBoard);
    board_calculate.iterate();
    const result: BoardType = board_calculate.getBoard();
    expect(result[0][2]).toBe(0);
    expect(result[1][2]).toBe(1);
    expect(result[2][1]).toBe(0);
    expect(result[2][2]).toBe(1);
    expect(result[2][3]).toBe(0);
    expect(result[3][2]).toBe(1);
  });

  it(`should return new board after two iterate`, () => {
    const board_calculate: MainBoard = new MainBoard(initBoard);
    board_calculate.iterate();
    board_calculate.iterate();
    const result: BoardType = board_calculate.getBoard();
    expect(result[0][2]).toBe(0);
    expect(result[1][2]).toBe(0);
    expect(result[2][1]).toBe(1);
    expect(result[2][2]).toBe(1);
    expect(result[2][3]).toBe(1);
    expect(result[3][2]).toBe(0);
  });
});
