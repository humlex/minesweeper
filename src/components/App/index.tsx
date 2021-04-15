import React, { FC, ReactNode, useState, useEffect } from "react";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import { generateCells } from "../../utils/index";
import { Cell, Face } from "../../types/index";
import Button from "../Button/index";
import "./index.scss";

const App: FC<{}> = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.Smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);

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
    if (live) {
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
  };

  const handleFaceClick = (): void => {
    if (live) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
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
        />
      ))
    );
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <NumberDisplay value={0} />
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
