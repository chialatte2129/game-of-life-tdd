import { BoardType } from "./BoardExec";

export class BoardExec {
  private board: BoardType;
  private rowCnt: number;
  private cellCnt: number;

  constructor(board: BoardType) {
    this.board = board;
    this.rowCnt = this.board.length;
    this.cellCnt = this.board[0].length;
  }

  iterate(): void {
    const tempBoard: BoardType = this.board.map((row) => [...row]);
    const newBoard: BoardType = tempBoard.map((row, i) => {
      return row.map((_, j) => {
        return this.getNextStatus(i, j) === "lives" ? 1 : 0;
      });
    });
    this.board = newBoard;
  }

  getBoard(): BoardType {
    return this.board;
  }

  getNextStatus(row: number, column: number): string {
    const cellStatus: number = this.board[row][column];

    const l: number = column > 0 ? this.board[row][column - 1] : 0;
    const tl: number =
      row > 0 && column > 0 ? this.board[row - 1][column - 1] : 0;
    const t: number = row > 0 ? this.board[row - 1][column] : 0;
    const tr: number =
      row > 0 && column < this.cellCnt - 1
        ? this.board[row - 1][column + 1]
        : 0;
    const r: number =
      column < this.cellCnt - 1 ? this.board[row][column + 1] : 0;
    const br: number =
      row < this.rowCnt - 1 && column < this.cellCnt - 1
        ? this.board[row + 1][column + 1]
        : 0;
    const b: number = row < this.rowCnt - 1 ? this.board[row + 1][column] : 0;
    const bl: number =
      row < this.rowCnt - 1 && column > 0 ? this.board[row + 1][column - 1] : 0;
    const liveNeighborCnt = l + tl + t + tr + r + br + b + bl;

    if (cellStatus === 1) {
      if (liveNeighborCnt >= 2 && liveNeighborCnt <= 3) {
        return "lives";
      } else {
        return "dies";
      }
    } else {
      if (liveNeighborCnt === 3) {
        return "lives";
      } else {
        return "dies";
      }
    }
  }
}
