import { Disk } from "../domain/disk";
import config from "../app/config";
import { convertToIndexFromPosition } from "../utils/utils";

const { boardWidth: width } = config;

export const initialDisks = (): (Disk|null)[] => {
  const disks: (Disk|null)[] =
    Array<Disk|null>(width * width).fill(null);
  setDisk(disks, Disk.White, [width / 2 - 1, width / 2 - 1]);
  setDisk(disks, Disk.White, [width / 2, width / 2]);
  setDisk(disks, Disk.Black, [width / 2 - 1, width / 2]);
  setDisk(disks, Disk.Black, [width / 2, width / 2 - 1]);
  return disks;
};

export const setDisk = (disks: (Disk|null)[], disk: Disk, position: [number, number]) => {
  const [x, y] = position;
  const i = convertToIndexFromPosition(x, y);
  disks[i] = disk
}

export const flipDisk = (disks: (Disk|null)[], position: [number, number]) => {
  const [x, y] = position;
  const i = convertToIndexFromPosition(x, y);
  const disk = disks[i];
  if (disk !== null) {
    disks[i] = disk === Disk.White ? Disk.Black : Disk.White;
  }
}

export const calculateFlipLines =
  (disks: (Disk|null)[], disk: Disk, position: [number, number]): [number, number][][] => {
    const directions: [number, number][] = [
      [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];

    const diskAt = (x: number, y: number): Disk|null => {
      if (x < 0 || y < 0 || x >= width || y >= width) {
        return null;
      }
      const index = convertToIndexFromPosition(x, y);
      return disks[index];
    }

    const lines: [number, number][][] = [];

    const calculateFlipPositionsInLine =
      (position: [number, number], direction: [number, number]) => {
        let [x, y] = position;
        const [dx, dy] = direction;
        let line: [number, number][] = [];
        while(true) {
          x += dx;
          y += dy;
          if (diskAt(x, y) !== disk && diskAt(x, y) !== null) {
            line = [...line, [x, y]]
            continue;
          }
          if (diskAt(x, y) === disk) {
            break;
          }
          if (diskAt(x, y) === null) {
            line = [];
            break;
          }
        }
        return line;
      };

    for (const direction of directions) {
      lines.push(calculateFlipPositionsInLine(position, direction));
    }
    return lines;
  }

export const isPuttable = (disks: (Disk|null)[], disk: Disk, position: [number, number]): Boolean => {
  const lines = calculateFlipLines(disks, disk, position);
  return lines.some(v => v.length > 0);
}

export const calculatePuttablePositions = (disks: (Disk|null)[], disk: Disk): [number, number][] => {
  const diskAt = (x: number, y: number): Disk|null => {
    if (x < 0 || y < 0 || x >= width || y >= width) {
      return null;
    }
    const index = convertToIndexFromPosition(x, y);
    return disks[index];
  }

  const positions: [number, number][] = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < width; y++) {
      if (diskAt(x, y) !== null) continue;
      if (!isPuttable(disks, disk, [x, y])) continue;
      positions.push([x, y]);
    }
  }
  return positions;
}
