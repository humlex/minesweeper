import { MAX_COLS, MAX_ROWS } from "./../constants/index";
import { Cell, CellValue, CellState } from "./../types/index";

export const generateCells = (): Cell[][] => {
  let cells: Cell[][] = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.None,
        state: CellState.Open,
      });
    }
  }

  return cells;
};
