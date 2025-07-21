'use client';

import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import SetPeriodModal from './SetPeriodModal';

const serverData = [
  {
    startTime: '2025-07-04T05:00:00.000Z',
    endTime: '2025-07-04T06:00:00.000Z',
    voteCount: 3,
  },
  {
    startTime: '2025-07-10T07:00:00.000Z',
    endTime: '2025-07-10T08:00:00.000Z',
    voteCount: 1,
  },
];

type Cell = { day: number; hour: number };

const day = ['금', '토', '일', '월', '화', '수', '목'];
const date = [
  '2025-07-04',
  '2025-07-05',
  '2025-07-06',
  '2025-07-07',
  '2025-07-08',
  '2025-07-09',
  '2025-07-10',
];

export default function TimeGrid() {
  const [isOpenPeriod, setIsOpenPeriod] = useState(false);
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [anchorCell, setAnchorCell] = useState<Cell | null>(null);
  const isDragging = useRef(false);
  const [voteMap, setVoteMap] = useState<Map<string, number>>(new Map());

  const closePeriodModalHandler = () => {
    setIsOpenPeriod(false);
  };

  useEffect(() => {
    const newMap = new Map<string, number>();
    serverData.forEach((item) => {
      const start = dayjs(item.startTime);
      const end = dayjs(item.endTime);
      const dateKey = start.format('YYYY-MM-DD');
      const hour = start.hour();
      newMap.set(`${dateKey}-${hour}`, item.voteCount);
    });
    setVoteMap(newMap);
  }, []);

  const isSameCell = (a: Cell, b: Cell) => a.day === b.day && a.hour === b.hour;

  const isCellSelected = (cell: Cell) =>
    selectedCells.some((c) => isSameCell(c, cell));

  const addCell = (cell: Cell) => {
    setSelectedCells((prev) => (isCellSelected(cell) ? prev : [...prev, cell]));
  };

  const removeCell = (cell: Cell) => {
    setSelectedCells((prev) => prev.filter((c) => !isSameCell(c, cell)));
  };

  const toggleCell = (cell: Cell) => {
    if (isCellSelected(cell)) {
      removeCell(cell);
    } else {
      addCell(cell);
    }
  };

  const handleMouseDown = (cell: Cell) => {
    isDragging.current = true;
    setAnchorCell(cell);
    addCell(cell);
  };

  const handleMouseUp = (cell: Cell) => {
    isDragging.current = false;

    if (anchorCell && !isSameCell(anchorCell, cell)) {
      if (anchorCell.day === cell.day) {
        const minHour = Math.min(anchorCell.hour, cell.hour);
        const maxHour = Math.max(anchorCell.hour, cell.hour);
        const range = Array.from({ length: maxHour - minHour + 1 }, (_, i) => ({
          day: cell.day,
          hour: minHour + i,
        }));
        const newSet = [
          ...selectedCells.filter((c) => c.day !== cell.day),
          ...range,
        ];
        setSelectedCells(newSet);
      }
      setAnchorCell(null);
    }
  };

  const handleMouseEnter = (cell: Cell) => {
    if (isDragging.current) {
      addCell(cell);
    }
  };

  const getBgClass = (count: number) => {
    if (count >= 5) return 'bg-blue-700 text-white';
    if (count === 4) return 'bg-blue-500 text-white';
    if (count === 3) return 'bg-blue-400 text-white';
    if (count === 2) return 'bg-blue-300';
    if (count === 1) return 'bg-blue-100';
    return 'bg-[#fafafa] hover:bg-[#f1f1f1]';
  };

  return (
    <>
      <div className='select-none flex flex-col gap-[30px] '>
        <div className='grid grid-cols-[6px_repeat(7,minmax(0,1fr))] place-items-center gap-x-4 gap-y-0 px-20'>
          <div></div>
          {day.map((d) => (
            <div
              key={d}
              className='text-center tm2 text-text1 opacity-50 bg-white'
            >
              {d}
            </div>
          ))}

          <div></div>
          {date.map((d) => (
            <div
              key={d}
              className='text-center tm2 text-text1 opacity-50 py-2 bg-white'
            >
              {d.slice(5).replace('-', '.')}
            </div>
          ))}

          {[...Array(24)].map((_, hour) => (
            <React.Fragment key={hour}>
              <div className='relative w-[18px] h-9'>
                <span className='absolute right-0 top-0 transform -translate-y-1/2 text-sm text-text1 opacity-50'>
                  {hour}
                </span>
              </div>
              {date.map((dateStr, day) => {
                const cell = { day, hour };
                const selected = isCellSelected(cell);
                const key = `${dateStr}-${hour}`;
                const count = voteMap.get(key) || 0;

                return (
                  <div
                    key={`${day}-${hour}`}
                    onMouseDown={() => handleMouseDown(cell)}
                    onMouseEnter={() => handleMouseEnter(cell)}
                    onMouseUp={() => handleMouseUp(cell)}
                    className={`w-20 h-9 border-b border-b-border2 ${
                      selected ? 'bg-gray1 text-white' : getBgClass(count)
                    } ${hour === 0 && 'rounded-t-xl'} ${
                      hour === 23 && 'rounded-b-xl border-none'
                    } cursor-pointer relative`}
                  >
                    {count > 0 && (
                      <span className='absolute right-1 bottom-0 text-xs text-black opacity-60'>
                        {count}
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <div className='flex justify-end gap-[10px] px-20'>
          <button
            className='w-[235px] h-[48px] bg-white border border-main rounded-[10px] tm3 text-text1 hover:bg-gray4'
            onClick={() => setIsOpenPeriod(true)}
          >
            가능 시간 요청
          </button>
          <button className='w-[235px] h-[48px] bg-main rounded-[10px] tm3 text-white hover:bg-[#292929]'>
            시간 제출
          </button>
        </div>
      </div>

      {isOpenPeriod && (
        <SetPeriodModal closeHandler={closePeriodModalHandler} />
      )}
    </>
  );
}
