import React, { FC, ReactNode, useState } from "react";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import { generateCells } from "../../utils/index";
import Button from "../Button/index";
import "./index.scss";

const App: FC<{}> = () => {
  const [cells, setCells] = useState(generateCells());

  const renderCells = (): ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => <Button key={`${rowIndex} - ${colIndex}`} />)
    );
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <NumberDisplay value={0} />
          <div className="face">
            <span role="img" aria-label="face">
              😉
            </span>
          </div>
          <NumberDisplay value={23} />
        </div>
        <div className="body">{renderCells()}</div>
      </div>
    </>
  );
};

export default App;
