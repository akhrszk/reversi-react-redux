import React from 'react';
import { useSelector } from 'react-redux';
import { selectStatus } from './statusSlice';
import { Disk } from '../../domain/disk';

import styles from './Status.module.css';

type DiskCounterProps = { disk: Disk, value: number };
const renderDiskCounter = (props: DiskCounterProps) => (
  <span key={props.disk === Disk.White ? 'white' : 'black'}
    className={styles.diskCount}
  >
    {`${props.disk === Disk.White ? 'o' : 'x'}: ${props.value}`}
  </span>
);

export const Status = () => {
  const { step, nextPlayer, diskCount } = useSelector(selectStatus);

  return (
    <div className={styles.status}>
      <div>{`Step: #${step}`}</div>
      {nextPlayer
        ? <div>{`Next: ${nextPlayer.disk === Disk.White ? 'o' : 'x'}`}</div>
        : <div>Game...</div>
      }
      <div>{diskCount.map(v => renderDiskCounter(v))}</div>
    </div>
  );
};
