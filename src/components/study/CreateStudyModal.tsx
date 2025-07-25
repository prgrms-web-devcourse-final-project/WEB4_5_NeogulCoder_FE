'use client';

import { createStudy } from '@/lib/api/study/create';
import { Camera, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CreateStudyModal() {
  // const [personCount, setPersonCount] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [studyType, setStudyType] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // 실제 전송용
      setImagePreview(URL.createObjectURL(file)); // 미리보기용
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    const requestPayload = {
      name,
      category,
      capacity,
      studyType,
      location,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      introduction,
    };

    console.log(requestPayload);
    formData.append('request', JSON.stringify(requestPayload));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const data = await createStudy(formData);
      console.log('생성 완료', data);
    } catch (error) {
      console.error('응답 에러:', error);
    }
  };

  // const handlePersonCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = e.target.value;

  //   if (!/^\d*$/.test(input)) return;
  //   if (input === '') {
  //     setPersonCount('');
  //     return;
  //   }

  //   const value = Number(input);

  //   // 3. 숫자 범위 제한
  //   if (value < 1) {
  //     setPersonCount(1);
  //   } else if (value > 1000) {
  //     setPersonCount(1000);
  //   } else {
  //     setPersonCount(value);
  //   }
  // };

  return (
    <>
      <div className='relative w-fit mx-auto my-10'>
        <input
          type='file'
          accept='image/*'
          id='imageUpload'
          onChange={handleImageChange}
          hidden
        />

        <label htmlFor='imageUpload' className='cursor-pointer'>
          <div
            className='w-25 h-25 rounded-full bg-gray-300 bg-cover bg-center'
            style={{
              backgroundImage: imagePreview
                ? `url(${imagePreview})`
                : undefined,
            }}
          ></div>
          <div className='w-[30px] h-[30px] rounded-full bg-[#111111] absolute bottom-0 right-0 flex justify-center items-center'>
            <Camera color='#FFFFFF' size={18} />
          </div>
        </label>
      </div>

      <div className='flex flex-col w-full'>
        <div>
          <span className='tm-0 mb-2.5'>이름 </span>
          <span className='tm5 text-[#ff5955]'>(필수)</span>
        </div>
        <input
          className='border-[1px] h-15 rounded-[10px] p-5 mb-10'
          placeholder='이름을 입력해주세요'
          style={{ borderColor: 'var(--color-border3)' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className='flex space-x-5'>
        {/* 시작 날짜 */}
        <div className='flex flex-col w-full'>
          <div>
            <span className='tm-0 mb-2.5'>시작 날짜 </span>
            <span className='tm5 text-[#ff5955]'>(필수)</span>
          </div>
          <input
            type='date'
            className='border-[1px] h-15 rounded-[10px] p-5 mb-10'
            style={{ borderColor: 'var(--color-border3)' }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* 종료 날짜 */}
        <div className='flex flex-col w-full'>
          <div>
            <span className='tm-0 mb-2.5'>종료 날짜 </span>
            <span className='tm5 text-[#ff5955]'>(필수)</span>
          </div>
          <input
            type='date'
            className='border-[1px] h-15 rounded-[10px] p-5 mb-10'
            style={{ borderColor: 'var(--color-border3)' }}
            value={endDate}
            min={startDate || new Date().toISOString().split('T')[0]}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className='flex space-x-5'>
        {/* 인원 수 */}
        <div className='flex flex-col w-full mb-10'>
          <div>
            <span className='tm-0 mb-2.5'>인원 수 </span>
            <span className='tm5 text-[#ff5955]'>(필수)</span>
          </div>
          <div className='relative inline-block w-full'>
            <input
              type='number'
              min={1}
              max={1000}
              style={{ borderColor: 'var(--color-border3)' }}
              className='w-full h-[60px] border-[1px] px-4 appearance-none rounded-[10px]'
              name='capacity'
              placeholder='인원 수를 입력해주세요'
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
            />
          </div>
        </div>

        {/* 카테고리 */}
        <div className='flex flex-col w-full mb-10'>
          <div>
            <span className='tm-0 mb-2.5'>카테고리 </span>
            <span className='tm5 text-[#ff5955]'>(필수)</span>
          </div>
          <div className='relative inline-block w-full'>
            <select
              className='w-full h-[60px] border-[1px] pl-4 pr-10 appearance-none rounded-[10px]'
              name='selectedRecruitmentCategory'
              defaultValue=''
              style={{ borderColor: 'var(--color-border3)' }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='' disabled hidden>
                카테고리
              </option>
              <option value='LANGUAGE'>어학</option>
              <option value='IT'>IT</option>
              <option value='EXAM'>고시/자격증</option>
              <option value='FINANCE'>금융</option>
              <option value='MANAGEMENT'>경영</option>
              <option value='DESIGN'>디자인</option>
              <option value='ART'>예술</option>
              <option value='PHOTO_VIDEO'>사진/영상</option>
              <option value='BEAUTY'>뷰티</option>
              <option value='SPORTS'>스포츠</option>
              <option value='HOBBY'>취미</option>
              <option value='ETC'>기타</option>
            </select>
            <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
              <ChevronDown />
            </div>
          </div>
        </div>
      </div>

      <div className='flex space-x-5'>
        {/* 진행 방식 */}
        <div className='flex flex-col w-full mb-10'>
          <div>
            <span className='tm-0 mb-2.5'>진행 방식 </span>
            <span className='tm5 text-[#ff5955]'>(필수)</span>
          </div>
          <div className='relative inline-block w-full'>
            <select
              className='w-full h-[60px] border-[1px] pl-4 pr-10 appearance-none rounded-[10px]'
              name='selectedRecruitmentPerson'
              style={{ borderColor: 'var(--color-border3)' }}
              value={studyType}
              onChange={(e) => setStudyType(e.target.value)}
            >
              <option value='' disabled hidden>
                진행 방식
              </option>
              <option value='ONLINE'>온라인</option>
              <option value='OFFLINE'>오프라인</option>
              <option value='HYBRID'>온/오프라인</option>
            </select>
            <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
              <ChevronDown />
            </div>
          </div>
        </div>

        {/* 지역 */}
        <div className='flex flex-col w-full mb-10'>
          <div>
            <span className='tm-0 mb-2.5'>지역</span>
          </div>
          <div className='relative inline-block w-full'>
            <select
              className='w-full h-[60px] border-[1px] pl-4 pr-10 appearance-none rounded-[10px]'
              name='selectedRecruitmentPerson'
              defaultValue=''
              style={{ borderColor: 'var(--color-border3)' }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value='' disabled hidden>
                지역
              </option>
              <option value='서울'>서울</option>
              <option value='부산'>부산</option>
              <option value='대구'>대구</option>
              <option value='인천'>인천</option>
              <option value='광주'>광주</option>
              <option value='대전'>대전</option>
              <option value='울산'>울산</option>
              <option value='세종'>세종</option>
              <option value='경기도'>경기도</option>
              <option value='충청북도'>충청북도</option>
              <option value='충청남도'>충청남도</option>
              <option value='전라북도'>전라북도</option>
              <option value='전라남도'>전라남도</option>
              <option value='경상북도'>경상북도</option>
              <option value='경상남도'>경상남도</option>
              <option value='강원도'>강원도</option>
              <option value='제주도'>제주도</option>
            </select>
            <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
              <ChevronDown />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <span className='tm-0 mb-2.5'>스터디 한 줄 소개</span>
        <textarea
          className='border-[1px] h-[90px] rounded-[10px] p-3 mb-10'
          placeholder='스터디 한 줄 소개를 입력해주세요'
          style={{ borderColor: 'var(--color-border3)' }}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
      </div>

      <button
        className='button-modal1 hover:bg-[#292929]'
        onClick={handleSubmit}
      >
        등록
      </button>
    </>
  );
}
