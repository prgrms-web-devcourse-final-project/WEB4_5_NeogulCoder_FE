import dayjs from 'dayjs';
import { CalendarDays, Camera, ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

export default function StudyRoomInfoWrite({
  studyInfoData,
  closeFn,
}: {
  studyInfoData: StudyInfoType;
  closeFn: () => void;
}) {
  const [image, setImage] = useState(studyInfoData.imageUrl);
  const [name, setName] = useState(studyInfoData.name);
  const [category, setCategory] = useState(studyInfoData.category);
  const [capacity, setCapacity] = useState(studyInfoData.capacity);
  const [studyType, setStudyType] = useState(studyInfoData.studyType);
  const [location, setLocation] = useState(studyInfoData.location);
  const [startDate, setStartDate] = useState(studyInfoData.startDate);
  const [introduction, setIntroduction] = useState(studyInfoData.introduction);

  const [capacityCheck, setCapacityCheck] = useState(false);

  const handleCapacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value.replace(/[^0-9]/g, '');
    if (Number(number) < studyInfoData.members.length) {
      setCapacityCheck(true);
    } else {
      setCapacityCheck(false);
    }
    setCapacity(Number(number));
  };
  const handleBlurCapacity = () => {
    const vlaue =
      capacity < studyInfoData.members.length
        ? studyInfoData.members.length
        : capacity;

    setCapacity(vlaue);
  };

  const hadleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let capacityUpdate = studyInfoData.members.length;
    if (capacity > studyInfoData.members.length) {
      capacityUpdate = capacity;
    }

    const updateData: StudyInfoUpdateType = {
      imageUrl: image,
      name: name,
      category: category,
      capacity: capacityUpdate,
      studyType: studyType,
      location: location,
      startDate: startDate,
      introduction: introduction,
    };

    console.log(updateData);
  };

  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='py-7 rounded-[10px] bg-white drop-shadow-md max-w-[650px] min-w-[580px]'>
          <div className='flex justify-between mb-8 px-9 '>
            <h3 className='tm2'>스터디 정보 수정</h3>
            <button onClick={closeFn}>
              <X className='w-8 y-8' />
            </button>
          </div>
          <div>
            <form onSubmit={hadleSubmit}>
              <div className='px-9 mb-8 flex flex-col gap-4 max-h-[calc(90vh-160px)] overflow-auto'>
                <div className='w-[100px] h-[100px] mx-auto relative shrink-0'>
                  <div className='w-full h-full rounded-full bg-gray3'>
                    <Image
                      src={studyInfoData.imageUrl}
                      width='100'
                      height='0'
                      alt={`${studyInfoData.name} 프로필 사진`}
                    />
                  </div>
                  <button className='w-[30px] h-[30px] rounded-full flex items-center justify-center bg-main absolute right-0 bottom-0'>
                    <Camera className='w-5 h-5 text-white' />
                  </button>
                </div>
                <div className=' shrink-0'>
                  <p className='t3 mb-3'>
                    이름 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full input-type2'
                  />
                </div>
                <div className=' shrink-0'>
                  <p className='t3 mb-3'>
                    카테고리 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='w-full relative'>
                    <select className='w-full input-type2 appearance-none pr-9!'>
                      <option>개발/IT</option>
                    </select>
                    <ChevronDown className='absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 -z-1' />
                  </div>
                </div>

                <div className=' shrink-0'>
                  <p className='t3 mb-3'>
                    인원 수{' '}
                    <span className='tm5 text-red'>
                      (필수){' '}
                      {capacityCheck &&
                        '현재 참여중인 인원 수 보다 적게 수정 할 수 없습니다.'}
                    </span>
                  </p>
                  <div className='flex w-full gap-3 items-end'>
                    <input
                      type='text'
                      value={capacity}
                      onChange={handleCapacity}
                      onBlur={handleBlurCapacity}
                      className='w-full input-type2'
                    />
                    <span className='tm4 shrink-0'>명</span>
                  </div>
                </div>
                {dayjs(startDate).isAfter(dayjs().format('YYYY-MM-DD')) && (
                  <div className=' shrink-0'>
                    <p className='t3 mb-3'>
                      시작날짜 <span className='tm5 text-red'>(필수)</span>
                    </p>
                    <label className='w-full relative'>
                      <input
                        type='date'
                        min={dayjs().format('YYYY-MM-DD')}
                        className='date-custom w-full input-type2 pr-9!'
                      />
                      <CalendarDays
                        strokeWidth={1}
                        className='w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2 -z-1'
                      />
                    </label>
                  </div>
                )}

                <div className=' shrink-0'>
                  <p className='t3 mb-3'>
                    진행방식 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='flex gap-3'>
                    <div className='w-full relative'>
                      <select className='w-full input-type2 appearance-none pr-9!'>
                        <option>온/오프라인</option>
                        <option>오프라인</option>
                        <option>온라인</option>
                      </select>
                      <ChevronDown className='absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 -z-1' />
                    </div>
                    <div className='w-full relative'>
                      <select className='w-full input-type2 appearance-none pr-9!'>
                        <option>서울시</option>
                        <option>수원시</option>
                        <option>고양시</option>
                        <option>용인시</option>
                        <option>성남시</option>
                      </select>
                      <ChevronDown className='absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 -z-1' />
                    </div>
                  </div>
                </div>
                <div className=' shrink-0'>
                  <p className='t3 mb-3'>스터디 한 줄 소개</p>
                  <textarea
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    className='input-type2 py-3 resize-none w-full h-[90px]!'
                  />
                </div>
              </div>
              <div className='px-9'>
                <button className='button-modal1'>등록</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
