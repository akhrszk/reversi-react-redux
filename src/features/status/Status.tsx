import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectStatus } from './statusSlice';
import { Disk } from '../../domain/disk';

import styles from './Status.module.css';
import { Player } from '../../domain/player';

type DiskCounterProps = { disk: Disk, value: number };
const renderDiskCounter = (props: DiskCounterProps) => (
  <div key={props.disk === Disk.White ? 'white' : 'black'}
    className={styles.diskCount}
  >
    <span
      className={
        classNames({
          [styles.white]: props.disk === Disk.White,
          [styles.black]: props.disk === Disk.Black
        })
      }
    >
      &#9679;
    </span>
    <span>{`: ${props.value}`}</span>
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
  const { step, nextPlayer, winner, diskCount } = useSelector(selectStatus);
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
      <li className={styles.item}>{diskCount.map(v => renderDiskCounter(v))}</li>
      </ul>
    </div>
  );
};
