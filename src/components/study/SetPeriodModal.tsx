'use client';

import { CalendarDays, X } from 'lucide-react';

export default function SetPeriodModal({
  closeHandler,
}: {
  closeHandler: () => void;
}) {
  return (
    <>
      <div className="bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center">
        <div className="w-[580px] flex flex-col gap-12 px-9 py-7 rounded-[10px] bg-white drop-shadow-md">
          <div className="flex justify-between">
            <span className="tm1">기간 설정</span>
            <button onClick={closeHandler}>
              <X className="w-8 y-8" />
            </button>
          </div>
          <form>
            <div className="shrink-0">
              <p className="t2">
                기간 <span className="tm5 text-red">(필수)</span>
              </p>
              <div className="flex items-center gap-3 my-3">
                <label className="w-full relative">
                  <input
                    type="date"
                    className="date-custom w-full input-type2 tm3 pr-9!"
                  />
                  <CalendarDays
                    strokeWidth={1}
                    className="w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2"
                  />
                </label>
                <p className="tm3 shrink-0">~</p>
                <label className="w-full relative">
                  <input
                    type="date"
                    className="date-custom w-full input-type2 tm3 pr-9!"
                  />
                  <CalendarDays
                    strokeWidth={1}
                    className="w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2"
                  />
                </label>
              </div>
              <span className="tm5 text-red flex justify-end">
                *최대 7일까지만 가능합니다.
              </span>
            </div>
            <div className="mt-12">
              <button className="button-modal1">요청</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
