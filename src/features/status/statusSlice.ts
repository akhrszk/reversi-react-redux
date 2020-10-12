import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../domain/player";
import { RootState } from "../../app/store";
import { Disk } from "../../domain/disk";
import { countDisks } from "../../utils/utils";
import { initialDisks } from "../../core/game";

interface Status {
  step: number,
  nextPlayer: Player|null,
  winner: Player|null,
  diskCount: { disk: Disk, value: number }[]
}

const player1: Player = { disk: Disk.White };
const player2: Player = { disk: Disk.Black };
export const players: [Player, Player] = [player1, player2];

const initialState: Status = {
  step: 1,
  nextPlayer: player1,
  winner: null,
  diskCount: [
    { disk: Disk.White, value: countDisks(initialDisks(), Disk.White) },
    { disk: Disk.Black, value: countDisks(initialDisks(), Disk.Black) }
  ]
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    nextTurn: (state) => {
      const { step } = state;
      state.nextPlayer = players[(step + 1) % 2 === 0 ? 1 : 0];
      state.step = step + 1;
    },
    updateDiskCount: (state, action: PayloadAction<(Disk|null)[]>) => {
      const disks = action.payload;
      state.diskCount = [
        { disk: Disk.White, value: countDisks(disks, Disk.White) },
        { disk: Disk.Black, value: countDisks(disks, Disk.Black) }
      ];
    },
    finishGame: (state, action: PayloadAction<(Disk|null)[]>) => {
      const whiteCount = countDisks(action.payload, Disk.White);
      const blackCount = countDisks(action.payload, Disk.Black);
      if (whiteCount > blackCount) {
        state.winner = player1;
      } else if (whiteCount < blackCount) {
        state.winner = player2;
      }
      state.nextPlayer = null;
    }
  }
});

export const { nextTurn, updateDiskCount, finishGame } = statusSlice.actions;

export const selectStatus = (state: RootState) => state.status;

export default statusSlice.reducer;
