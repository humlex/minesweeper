import React, { FC, ReactNode, useState, useEffect } from "react";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import { generateCells, openMultipleCells } from "../../utils/index";
import { Cell, CellState, CellValue, Face } from "../../types/index";
import Button from "../Button/index";
import "./index.scss";

const App: FC<{}> = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.Smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setFace(Face.Oh);
    };
    const handleMouseUp = (): void => {
      setFace(Face.Smile);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    if (!live) {
      setLive(true);
    }
    const currentCell = cells[rowParam][colParam];
    let newCells = cells.slice();

    if ([CellState.Flagged, CellState.Visible].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === CellValue.Bomb) {
      // TODO
    } else if (currentCell.value === CellValue.None) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
      setCells(newCells);
    } else {
      newCells[rowParam][colParam].state = CellState.Visible;
      setCells(newCells);
    }
  };

  const handleFaceClick = (): void => {
    if (live) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
    }
  };

  const handleCellContext = (rowParam: number, colParam: number) => (
    event: MouseEvent
  ): void => {
    event.preventDefault();

    if (!live) {
      return;
    }

    const currentCells = cells.slice();
    const currentCell = cells[rowParam][colParam];
    if (currentCell.state === CellState.Visible) {
      return;
    } else if (currentCell.state === CellState.Open) {
      currentCells[rowParam][colParam].state = CellState.Flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.Flagged) {
      currentCells[rowParam][colParam].state = CellState.Open;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    }
  };

  const renderCells = (): ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex} - ${colIndex}`}
          col={colIndex}
          row={rowIndex}
          state={cell.state}
          value={cell.value}
          onClick={handleCellClick}
          onContext={handleCellContext}
        />
      ))
    );
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <NumberDisplay value={bombCounter} />
          <div className="face" onClick={handleFaceClick}>
            <span role="img" aria-label="Face">
              {face}
            </span>
          </div>
          <NumberDisplay value={time} />
        </div>
        <div className="body">{renderCells()}</div>
      </div>
    </>
  );
};

export default App;
