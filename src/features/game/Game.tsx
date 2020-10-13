import React, { useEffect } from 'react';
import Board from '../board/Board';
import { Status } from '../status/Status';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, nextTurn, finishGame } from '../status/statusSlice';
import { selectBoard, putDisk } from '../board/boardSlice';
import { Disk } from '../../domain/disk';

export const Game = () => {
  const { step, nextPlayer } = useSelector(selectStatus);
  const { disks, puttablePositions } = useSelector(selectBoard);
  const dispatch = useDispatch();

  /* 白も黒も置く場所がない場合ゲーム終了とみなす */
  const isFinishedGame = () =>
    !puttablePositions.find(v => v.disk === Disk.White)?.value.length
      && !puttablePositions.find(v => v.disk === Disk.Black)?.value.length;

  const hasPuttablePositions = (disk: Disk) =>
    !!puttablePositions.find(v => v.disk === disk)?.value.length;

  useEffect(() => {
    // ターンが変わるごとに実行
    if (nextPlayer) {
      if (isFinishedGame()) {
        console.log("game...");
        dispatch(finishGame(disks));
      } else if (!hasPuttablePositions(nextPlayer.disk)) {
        // 置く場所がない場合パス
        console.log(`${nextPlayer.disk === Disk.White ? 'White' : 'Black'} passed.`);
        dispatch(nextTurn());
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, dispatch]);

  /* 盤に石を置く処理 */
  const putDiskAt = (position: [number, number]): void => {
    if (nextPlayer) {
      dispatch(putDisk({ disk: nextPlayer.disk, position }));
      dispatch(nextTurn());
    }
  };

  return (
    <>
      <Board putDisk={putDiskAt} />
      <Status />
    </>
  );
};
