import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../domain/player";
import { RootState } from "../../app/store";
import { Disk } from "../../domain/disk";
import { countDisks } from "../../utils/utils";

interface Status {
  step: number,
  nextPlayer: Player|null,
  winner: Player|null,
}

const player1: Player = { disk: Disk.White };
const player2: Player = { disk: Disk.Black };
export const players: [Player, Player] = [player1, player2];

const initialState: Status = {
  step: 1,
  nextPlayer: player1,
  winner: null,
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

export const { nextTurn, finishGame } = statusSlice.actions;

export const selectStatus = (state: RootState) => state.status;

export default statusSlice.reducer;
