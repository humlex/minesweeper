import React, { FC, ReactNode } from "react";
import { CellState, CellValue } from "../../types/index";
import "./Button.scss";

interface ButtonProps {
  key: string;
  col: number;
  row: number;
  state: CellState;
  value: CellValue;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
}

const Button: FC<ButtonProps> = ({
  col,
  row,
  onClick,
  onContext,
  state,
  value,
}) => {
  const renderContent = (): ReactNode => {
    if (state === CellState.Visible) {
      if (value === CellValue.Bomb) {
        return (
          <span role="img" aria-label="Bomb">
            💣
          </span>
        );
      } else if (value === CellValue.None) {
        return null;
      }
      return value;
    } else if (state === CellState.Flagged) {
      return (
        <span role="img" aria-label="Flag">
          🚩
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`Button ${
        state === CellState.Visible ? "Visible" : ""
      } Value-${value}`}
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
    >
      {renderContent()}
    </div>
  );
};

export default Button;
