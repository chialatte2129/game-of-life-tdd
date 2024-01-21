import { useState } from "react";
import "./App.css";
import { BoardType } from "./board_calculator/BoardExec";
import { BoardExec } from "./board_calculator/BoardType";
import MainBoard from "./components/MainBoard";
import SizeInput from "./components/SizeInput";

const initRunTime: number = 20;
const initRow: number = 25;
const initColumn: number = 25;
const initBoardSize: number[] = [initRow, initColumn];
const initBoard: BoardType = Array(initRow).fill(Array(initColumn).fill(0));

function App() {
  const [boardSizeState, setBoardSizeState] = useState(initBoardSize);
  const [boardState, setBoardState] = useState(initBoard);
  const [counterState, setCounterState] = useState<number>(0);
  const [runTimesState, setRunTimesState] = useState<number>(initRunTime);

  function handleRowChange(row: number) {
    setBoardSizeState((prevBoardSize) => {
      const newBoardSize = [...prevBoardSize];
      newBoardSize[0] = row > 0 ? row : 1;
      setBoardState(
        Array(newBoardSize[0]).fill(Array(newBoardSize[1]).fill(0))
      );
      return newBoardSize;
    });
  }

  function handleColumnChange(column: number) {
    setBoardSizeState((prevBoardSize) => {
      const newBoardSize = [...prevBoardSize];
      newBoardSize[1] = column > 0 ? column : 1;
      setBoardState(
        Array(newBoardSize[0]).fill(Array(newBoardSize[1]).fill(0))
      );
      return newBoardSize;
    });
  }

  function handleRunTimeChange(runTime: number) {
    setRunTimesState(runTime);
  }

  function onCellClick(rowIndex: number, colIndex: number) {
    setBoardState((prevBoard) => {
      const newBoard = [...prevBoard.map((row) => [...row])];
      if (prevBoard[rowIndex][colIndex] === 0) {
        newBoard[rowIndex][colIndex] = 1;
      } else {
        newBoard[rowIndex][colIndex] = 0;
      }
      return newBoard;
    });
  }

  function runGame() {
    setBoardState((prevBoard) => {
      const boardExec = new BoardExec(prevBoard);
      boardExec.iterate();
      return boardExec.getBoard();
    });
  }

  function countDown() {
    setCounterState((prevCounter) => {
      if (prevCounter > 0) {
        return prevCounter - 1;
      } else {
        return prevCounter;
      }
    });
  }

  function onStartClick() {
    if (runTimesState > 0) {
      setCounterState(runTimesState);
      for (let i = 0; i < runTimesState; i++) {
        setTimeout(() => {
          runGame();
          countDown();
        }, 200 * i);
      }
    }
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src="GOL-logo.png" className="logo react" alt="Game logo" />
        </a>
      </div>
      <h1>Game Of Life</h1>
      <div className="card">
        <ol id="info">
          <div className="setting-box">
            <SizeInput
              title="Row"
              defaultValue={boardSizeState[0]}
              onChange={handleRowChange}
            />
            <SizeInput
              title="Col"
              defaultValue={boardSizeState[1]}
              onChange={handleColumnChange}
            />
          </div>
        </ol>
        <MainBoard board={boardState} onCellClick={onCellClick} />
        <ol id="info">
          <SizeInput
            title="RunTime"
            defaultValue={runTimesState}
            onChange={handleRunTimeChange}
          />
          <li id="start-game">
            <button disabled={counterState > 0} onClick={onStartClick}>
              {counterState === 0 ? "Start" : counterState}
            </button>
          </li>
        </ol>
      </div>
    </>
  );
}

export default App;
