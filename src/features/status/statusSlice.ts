import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../domain/player";
import { RootState } from "../../app/store";
import { Disk } from "../../domain/disk";
import { countDisks } from "../../utils/utils";
import { players } from "../../core/game";

interface Status {
  step: number,
  nextPlayer: Player|null,
  winner: Player|null,
}

const initialState: Status = {
  step: 1,
  nextPlayer: players[0],
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
        state.winner = players.find(player => player.disk === Disk.White) || null;
      } else if (whiteCount < blackCount) {
        state.winner = players.find(player => player.disk === Disk.Black) || null;
      }
      state.nextPlayer = null;
    }
  }
});

export const { nextTurn, finishGame } = statusSlice.actions;

export const selectStatus = (state: RootState) => state.status;

export default statusSlice.reducer;
