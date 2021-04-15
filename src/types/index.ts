export enum CellValue {
  None,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Bomb,
}

export enum CellState {
  Open,
  Visible,
  Flagged,
}

export type Cell = {
  value: CellValue;
  state: CellState;
};

export enum Face {
  Smile = "😉",
  Oh = "😳",
  Lost = "😵",
  Won = "😎",
}
