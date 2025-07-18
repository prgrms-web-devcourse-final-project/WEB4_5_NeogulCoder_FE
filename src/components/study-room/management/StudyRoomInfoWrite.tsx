import CategoriesModal from '@/components/common/CategoriesModal';
import OnlineModal from '@/components/common/OnlineModal';
import RegionModal from '@/components/common/RegionModal';
import dayjs from 'dayjs';
import { CalendarDays, Camera, ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function StudyRoomInfoWrite({
  studyInfoData,
  closeFn,
}: {
  studyInfoData: StudyInfoType;
  closeFn: () => void;
}) {
  const [image, setImage] = useState(studyInfoData.imageUrl);
  const [name, setName] = useState(studyInfoData.name);

  const [capacity, setCapacity] = useState(studyInfoData.capacity);
  //  const [category, setCategory] = useState();
  // const [studyType, setStudyType] = useState();
  // const [location, setLocation] = useState();
  const [startDate, setStartDate] = useState(studyInfoData.startDate);
  const [introduction, setIntroduction] = useState(studyInfoData.introduction);

  const [capacityCheck, setCapacityCheck] = useState(false);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    studyInfoData.category
  );
  const [isOpenRegionModal, setIsOpenRegionModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(studyInfoData.location);
  const [isOpenStudyTypeModal, setIsOpenStudyTypeModal] = useState(false);
  const [selectedStudyType, setSelectedStudyType] = useState(
    studyInfoData.studyType === 'ONLINE'
      ? '온라인'
      : studyInfoData.studyType === 'OFFLINE'
      ? '오프라인'
      : studyInfoData.studyType === 'HYBRID'
      ? '온/오프라인'
      : studyInfoData.studyType
  );

  const [imageFile, setImageFiles] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(studyInfoData.imageUrl);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFiles(file);

      const imagePreviewUrl = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl);
    }
  };

  // 메모리 누수 방지 - 이미지 업로드 후 Blob URL 해제
  useEffect(() => {
    if (imagePreview) {
      return () => URL.revokeObjectURL(imagePreview);
    }
  }, [imagePreview]);

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

    const studyType =
      selectedStudyType === '온라인'
        ? 'ONLINE'
        : selectedStudyType === '오프라인'
        ? 'OFFLINE'
        : 'HYBRID';

    const formData = new FormData();

    if (imageFile) {
      formData.append('name', name);
      formData.append('category', selectedCategory);
      formData.append('capacity', String(capacityUpdate));
      formData.append('studyType', studyType);
      formData.append('location', selectedRegion);
      formData.append('startDate', startDate);
      formData.append('introduction', introduction);
      formData.append('imageUrl', imageFile); // 여기!

      console.log('formData', ...formData);
    } else {
      const updateData: StudyInfoUpdateType = {
        name: name,
        category: selectedCategory,
        capacity: capacityUpdate,
        studyType: studyType,
        location: selectedRegion,
        startDate: startDate,
        introduction: introduction,
        imageUrl: image,
      };
      console.log('updateData', updateData);
    }
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
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='px-9 mb-8 flex flex-col gap-4 max-h-[calc(90vh-160px)] overflow-auto'>
                {/* 사진 */}
                <div className='w-[100px] h-[100px] mx-auto relative shrink-0 '>
                  <div className='w-full h-full rounded-full border border-border1 bg-gray3 overflow-hidden'>
                    <Image
                      src={imagePreview ?? image}
                      width='100'
                      height='100'
                      className='w-full h-full object-cover'
                      alt={`${studyInfoData.name} 프로필 사진`}
                    />
                  </div>
                  <label
                    htmlFor='image-upload'
                    className='w-[30px] h-[30px] cursor-pointer rounded-full flex items-center justify-center bg-main absolute right-0 bottom-0'
                  >
                    <input
                      type='file'
                      accept='image/png, image/jpeg, image/jpg'
                      onChange={onUploadImage}
                      className='hidden'
                      id='image-upload'
                    />
                    <Camera className='w-5 h-5 text-white' />
                  </label>
                </div>
                {/* 이름 */}
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
                {/* 카테고리 */}
                <div className=' shrink-0'>
                  <p className='t3 mb-3'>
                    카테고리 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='w-full relative input-type2'>
                    <button
                      className='w-full h-full text-left'
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpenCategoryModal((prev) => !prev);
                      }}
                    >
                      {selectedCategory}
                    </button>
                    <ChevronDown className='absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 -z-1' />
                    {isOpenCategoryModal && (
                      <div className='absolute top-full w-full left-0 z-1'>
                        <CategoriesModal
                          onSelect={(category: string) => {
                            setSelectedCategory(category);
                            setIsOpenCategoryModal(false);
                          }}
                          customCss='!w-full !h-[120px] !overflow-auto t4'
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* 인원 수 */}
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
                {/* 시작 날짜 (스터디 시작 전에만 수정 가능) */}
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
                        onChange={(e) =>
                          setStartDate(
                            dayjs(e.target.value).format('YYYY-MM-DD')
                          )
                        }
                      />
                      <CalendarDays
                        strokeWidth={1}
                        className='w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2 -z-1'
                      />
                    </label>
                  </div>
                )}
                {/* 진행방식 */}
                <div className=' shrink-0'>
                  <p className='t3 mb-3'>
                    진행방식 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='flex gap-3'>
                    <div className='w-full relative input-type2'>
                      <button
                        className='w-full h-full text-left'
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpenStudyTypeModal((prev) => !prev);
                        }}
                      >
                        {selectedStudyType}
                      </button>
                      <ChevronDown className='absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 -z-1' />
                      {isOpenStudyTypeModal && (
                        <div className='absolute top-full w-full left-0 z-1'>
                          <OnlineModal
                            onSelect={(online: string) => {
                              setSelectedStudyType(online);
                              setIsOpenStudyTypeModal(false);
                            }}
                            customCss='!w-full !h-[120px] !overflow-auto t4'
                          />
                        </div>
                      )}
                    </div>
                    {selectedStudyType !== '온라인' && (
                      <div className='w-full relative input-type2'>
                        <button
                          className='w-full h-full text-left'
                          onClick={(e) => {
                            e.preventDefault();
                            setIsOpenRegionModal((prev) => !prev);
                          }}
                        >
                          {selectedRegion}
                        </button>
                        <ChevronDown className='absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 -z-1' />
                        {isOpenRegionModal && (
                          <div className='absolute top-full w-full left-0 z-1'>
                            <RegionModal
                              onSelect={(region: string) => {
                                setSelectedRegion(region);
                                setIsOpenRegionModal(false);
                              }}
                              customCss='!w-full !h-[120px] !overflow-auto t4'
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* 스터디 한 줄 소개 */}
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
                <button
                  className='button-modal1'
                  onClick={hadleSubmit}
                  disabled={
                    name === '' ||
                    selectedCategory === '' ||
                    capacityCheck ||
                    selectedStudyType === ''
                  }
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
