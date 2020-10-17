import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectStatus } from './statusSlice';
import { Disk } from '../../domain/disk';

import styles from './Status.module.css';
import { Player } from '../../domain/player';
import { selectBoard } from '../board/boardSlice';
import { countDisks } from '../../utils/utils';

const renderDiskCounter = (disk: Disk, count: number) => (
  <div key={disk === Disk.White ? 'white' : 'black'}
    className={styles.diskCount}
  >
    <span
      className={
        classNames({
          [styles.white]: disk === Disk.White,
          [styles.black]: disk === Disk.Black
        })
      }
    >
      &#9679;
    </span>
    <span>{`: ${count}`}</span>
  </div>
);

const renderNextPlayer = (player: Player) => (
  <div>
    {'Next: '}
    <span
      className={
        classNames({
          [styles.white]: player.disk === Disk.White,
          [styles.black]: player.disk === Disk.Black
        })
      }
    >
      &#9679;
    </span>
  </div>
);

const renderWinner = (player: Player) => (
  <div>
    <span
      className={
        classNames({
          [styles.white]: player.disk === Disk.White,
          [styles.black]: player.disk === Disk.Black
        })
      }
    >
      &#9679;
    </span>
    {' won'}
  </div>
);

export const Status = () => {
  const { step, nextPlayer, winner } = useSelector(selectStatus);
  const { disks } = useSelector(selectBoard);
  return (
    <div className={styles.status}>
      <ul>
        <li className={styles.item}>{`Step: #${step}`}</li>
      {nextPlayer
        ? <li className={styles.item}>{renderNextPlayer(nextPlayer)}</li>
        : winner
          ? <li className={styles.item}>{renderWinner(winner)}</li>
          : <li className={styles.item}>Tied</li>
      }
      <li className={styles.item}>
        {[Disk.Black, Disk.White].map(disk => renderDiskCounter(disk, countDisks(disks, disk)))}
      </li>
      </ul>
    </div>
  );
};
