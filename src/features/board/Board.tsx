import React from 'react';
import { Disk } from '../../domain/disk';
import { selectBoard } from './boardSlice';
import { useSelector } from 'react-redux';
import { convertToPositionFromIndex, isContainPositions } from '../../utils/utils';

import styles from './Board.module.css';
import { selectStatus } from '../status/statusSlice';

const Cell: React.FC<{
  disk: Disk|null,
  position: [number, number],
  onClick: (position: [number, number]) => void
}> = ({ disk, position, onClick }) => {
  if (disk === Disk.White) {
    return (<button className={styles.cell}>o</button>)
  }
  if (disk === Disk.Black) {
    return (<button className={styles.cell}>x</button>);
  }
  return (
    <button className={styles.cell} onClick={() => onClick(position)}></button>
  );
}

const Board: React.FC<{
  putDisk: (position: [number, number]) => void
}> = ({ putDisk }) => {
  const { disks, puttablePositions } = useSelector(selectBoard);
  const { nextPlayer } = useSelector(selectStatus);
  const onClickCell =
    (position: [number, number]) => {
      const positions: [number, number][] = puttablePositions.find(v => v.disk === nextPlayer?.disk)?.value || [];
      if (nextPlayer !== null && isContainPositions(position, positions)) {
        putDisk(position);
      }
    };

  return (
    <div>
      <div className={styles.board}>
        {disks.map((disk, i) =>
          <Cell key={i}
            disk={disk}
            position={convertToPositionFromIndex(i)}
            onClick={position => onClickCell(position)} />
        )}
      </div>
    </div>
  );
}

export default Board;
