import { BoardType } from "../board_calculator/BoardExec";
import { FC } from "react";

interface Props {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
}

const MainBoard: FC<Props> = ({ board, onCellClick }) => {
  return (
    <>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((col, colIndex) => (
              <div
                className={col ? "board-cell active" : "board-cell"}
                key={colIndex}
              >
                <div
                  className="board-inner-cell"
                  onClick={() => onCellClick(rowIndex, colIndex)}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default MainBoard;
