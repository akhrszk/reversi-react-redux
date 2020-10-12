import config from "../app/config";
import { Disk } from "../domain/disk";

const { boardWidth: width } = config;

/* Disk[]配列のindexから盤面の位置(x,y)に変換 */
export const convertToPositionFromIndex = (index: number): [number, number] =>
  [index % width, Math.floor(index / width)];

/* 盤面の位置(x,y)からDisk[]配列のindexに変換 */
export const convertToIndexFromPosition = (x: number, y: number): number =>  x + width * y;

export const isContainPositions =
  (position: [number, number], positions: [number, number][]): Boolean => {
    const [x, y] = position;
    return positions.some(v => x === v[0] && y === v[1]);
  };

/* 置かれているDiskの数を返す */
export const countDisks = (disks: (Disk|null)[], disk: Disk|null = null): number => {
  if (disk !== null) {
    return disks.filter(v => v === disk).length;
  }
  return disks.filter(v => v !== null).length;
}
