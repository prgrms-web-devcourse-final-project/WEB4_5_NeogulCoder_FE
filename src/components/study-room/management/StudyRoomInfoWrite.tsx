import CategoriesModal from '@/components/common/CategoriesModal';
import OnlineModal from '@/components/common/OnlineModal';
import RegionModal from '@/components/common/RegionModal';
import { putStudyInfo } from '@/lib/api/study.api';
import { categoryFormatting } from '@/utils/categoryFormatting';
import { studyTypeFormatting } from '@/utils/studyTypeFormatting';
import dayjs from 'dayjs';
// import studyDefault from '@/assets/images/study-default.svg';
import logoWibby from '@/assets/images/logo-wibby.svg';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import { useStudyStore } from '@/stores/studyInfoStore';
import { useStudiesStore } from '@/stores/useStudiesStore';
import { toast } from 'react-toastify';
import { CalendarDays, Camera, ChevronDown, X } from 'lucide-react';

export default function StudyRoomInfoWrite({
  studyInfoData,
  studyId,
  closeFn,
  handleUpdate,
}: {
  studyInfoData: StudyInfoType;
  studyId: number;
  closeFn: () => void;
  handleUpdate: (newData: StudyInfoUpdateType) => void;
}) {
  const updateStudyInfo = useStudyStore().updateStudyInfo;
  const updateStudies = useStudiesStore().updateStudy;

  const [name, setName] = useState(studyInfoData.name);
  const [capacity, setCapacity] = useState(studyInfoData.capacity);
  const [startDate, setStartDate] = useState(studyInfoData.startDate);
  const [introduction, setIntroduction] = useState(studyInfoData.introduction);
  const [selectedCategory, setSelectedCategory] = useState(
    studyInfoData.category
  );
  const [selectedRegion, setSelectedRegion] = useState(studyInfoData.location);
  const [selectedStudyType, setSelectedStudyType] = useState(
    studyInfoData.studyType
  );
  const [capacityCheck, setCapacityCheck] = useState(false);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [isOpenRegionModal, setIsOpenRegionModal] = useState(false);
  const [isOpenStudyTypeModal, setIsOpenStudyTypeModal] = useState(false);

  const [isPending, startTransition] = useTransition();

  const [imageFile, setImageFiles] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(studyInfoData.imageUrl);

  // 미래에 시작하는 스터디 인지 아닌지
  const isFutureStartDate = dayjs(startDate).isAfter(dayjs(), 'day');

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFiles(file);

      // 이전 미리보기 Blob URL 해제
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // 새로운 미리보기 URL 생성
      const imagePreviewUrl = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl);
    }
  };

  // 전체 인원수에 작성시 숫자만가능, 현재 스티디원 수보다 적게 지정 할수 없도록 관리
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
    startTransition(async () => {
      // 날짜 형식 맞추기
      let formattedStartDate;
      if (isFutureStartDate) {
        formattedStartDate = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss');
      } else {
        formattedStartDate = startDate;
      }

      // 현재 가입자 수 보다 작으면 수정 안되도록
      const capacityUpdate =
        capacity > studyInfoData.members.length
          ? capacity
          : studyInfoData.members.length;

      // 이미지 변경없을때 JSON 형식의 데이터
      const request: StudyInfoUpdateType = {
        name: name,
        category: selectedCategory,
        capacity: capacityUpdate,
        studyType: selectedStudyType,
        location: selectedRegion,
        introduction: introduction,
        startDate: formattedStartDate,
      };

      try {
        // FormData로 전송
        const formData = new FormData();
        formData.append(
          'request',
          new Blob([JSON.stringify(request)], { type: 'application/json' })
        );
        formData.append('image', imageFile || '');
        await putStudyInfo(studyId, formData);

        // 사이드메뉴 스터디 정보 관리를 위한 전역상태 업데이트
        updateStudyInfo({
          name: request.name,
          introduction: request.introduction,
          imageUrl: imageFile ? imagePreview : studyInfoData.imageUrl,
          studyType: request.studyType,
          location: request.location,
          category: request.category,
          capacity: request.capacity,
          startDate: formattedStartDate,
        });

        // 서브메뉴 스터디 목록 업데이트를 위한 전역상태 업데이트
        updateStudies(studyId, {
          name: request.name,
          introduction: request.introduction,
          imageUrl: imageFile ? imagePreview : studyInfoData.imageUrl,
          studyType: request.studyType,
          category: request.category,
          capacity: request.capacity,
          startDate: formattedStartDate,
        });

        // 관리페이지 업데이트
        handleUpdate({
          ...request,
          imageUrl: imageFile ? imagePreview : studyInfoData.imageUrl,
        });

        toast.success('스터디 정보를 수정했습니다.');
        closeFn(); // 모달 닫기
      } catch (error) {
        toast.error(`스터디 정보 수정에 실패했습니다.${error}`);
      }
    });
  };

  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center'>
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
                  <div className='w-full h-full rounded-full border border-border1 bg-white overflow-hidden flex item-center justify-center'>
                    <Image
                      src={imagePreview ?? studyInfoData.imageUrl ?? logoWibby}
                      width={100}
                      height={0}
                      alt={`${studyInfoData.name} 프로필 사진`}
                      className={
                        imagePreview
                          ? 'object-cover'
                          : 'object-contain scale-[0.6]'
                      }
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
                      {categoryFormatting(selectedCategory)}
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
                {isFutureStartDate && (
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
                        value={dayjs(startDate).format('YYYY-MM-DD')}
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
                        {studyTypeFormatting(selectedStudyType)}
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
                    {selectedStudyType !== 'ONLINE' && (
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
                              onSelect={(region: string | null) => {
                                if (region === null) return;
                                setSelectedRegion(region);
                                setIsOpenRegionModal(false);
                              }}
                              selectedRegion={selectedRegion}
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
                    selectedStudyType === '' ||
                    isPending
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
