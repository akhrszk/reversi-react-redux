import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Disk } from "../../domain/disk";
import { RootState } from "../../app/store";
import {
  initialDisks,
  setDisk,
  calculateFlipLines,
  flipDisk,
  calculatePuttablePositions,
} from "../../core/game";

interface State {
  disks: (Disk|null)[];
  puttablePositions: { disk: Disk, value: [number, number][] }[];
}

const initialState: State = {
  disks: initialDisks(),
  /* 白黒それぞれの置ける位置 */
  puttablePositions: [
    { disk: Disk.White, value: calculatePuttablePositions(initialDisks(), Disk.White) },
    { disk: Disk.Black, value: calculatePuttablePositions(initialDisks(), Disk.Black) },
  ]
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    putDisk: (state, action: PayloadAction<{ disk: Disk, position: [number, number]}>) => {
      const { disk, position } = action.payload;
      const { disks } = state;
      setDisk(disks, disk, position);

      /* 挟んだ石をひっくり返す */
      const lines = calculateFlipLines(disks, disk, position);
      lines.forEach(line => line.forEach(position => flipDisk(disks, position)));

      /* 白黒それぞれ置くことができる場所を計算 */
      state.puttablePositions = [
        { disk: Disk.White, value: calculatePuttablePositions(disks, Disk.White) },
        { disk: Disk.Black, value: calculatePuttablePositions(disks, Disk.Black) },
      ];
    }
  }
});

export const { putDisk } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;
