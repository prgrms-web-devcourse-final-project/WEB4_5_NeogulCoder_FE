import { ChevronDown } from 'lucide-react';
import ClientEditorWrapper from '@/components/common/ClientEditorWrapper';

export default async function page() {
  return (
    <>
      <div className='w-[920px] mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex justify-center items-center'>
            <div className='flex w-10 h-10 rounded-full bg-[#111111] justify-center items-center'>
              <span className='text-white tb2'>1</span>
            </div>
            <span className='tb2 mx-[25px] '>
              스터디 기본 정보를 입력해주세요
            </span>
          </div>
          <div>
            <div className='relative inline-block w-[320px] ml-14.5 mr-5'>
              <select
                className='w-full h-[60px] border-[1px] rounded-[10px] pl-4 pr-10 appearance-none'
                style={{ borderColor: 'var(--color-border3)' }}
                name='selectedStudy'
                defaultValue=''
              >
                <option value='' disabled hidden>
                  스터디를 선택해주세요
                </option>
                <option value='study1'>스터디 1</option>
                <option value='study2'>스터디 2</option>
              </select>

              {/* 커스텀 화살표 아이콘 (왼쪽으로 옮긴 예시) */}
              <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                <ChevronDown />
              </div>
            </div>
            <button className='button-type7 hover:bg-[#292929]'>
              가져오기
            </button>
          </div>
        </div>
        <hr
          className='h-0.5 my-10'
          style={{ borderColor: 'var(--color-border2)' }}
        />
        <div className='flex space-x-10'>
          <div className='flex flex-col w-[440px]'>
            <span className='tm-0 mb-2.5'>시작 날짜</span>
            <input
              type='date'
              className='border-[1px]  h-15 rounded-[10px] p-5 mb-10'
              style={{ borderColor: 'var(--color-border3)' }}
            ></input>
          </div>
          <div className='flex flex-col w-[440px]'>
            <span className='tm-0 mb-2.5'>종료 날짜</span>
            <input
              type='date'
              className='border-[1px]  h-15 rounded-[10px] p-5 mb-10'
              style={{ borderColor: 'var(--color-border3)' }}
            ></input>
          </div>
        </div>
        <div className='flex space-x-10'>
          <div className='flex flex-col w-[440px] mb-10'>
            <span className='tm-0 mb-2.5'>모집 인원</span>
            <div className='relative inline-block w-[440px] '>
              <select
                className='w-full h-[60px] border-[1px]  pl-4 pr-10 appearance-none rounded-[10px] '
                name='selectedRecruitmentPerson'
                defaultValue=''
                style={{ borderColor: 'var(--color-border3)' }}
              >
                <option value='' disabled hidden>
                  인원 미정 ~ 10명 이상
                </option>
                <option value='count0'>인원 미정</option>
                <option value='count1'>1명</option>
                <option value='count2'>2명</option>
                <option value='count3'>3명</option>
                <option value='count4'>4명</option>
                <option value='count5'>5명</option>
                <option value='count6'>6명</option>
                <option value='count7'>7명</option>
                <option value='count8'>8명</option>
                <option value='count9'>9명</option>
                <option value='count10'>10명 이상</option>
              </select>

              <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                <ChevronDown />
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[440px] mb-10'>
            <span className='tm-0 mb-2.5'>카테고리</span>
            <div className='relative inline-block w-[440px] '>
              <select
                className='w-full h-[60px] border-[1px]  pl-4 pr-10 appearance-none rounded-[10px] '
                name='selectedRecruitmentPerson'
                defaultValue=''
                style={{ borderColor: 'var(--color-border3)' }}
              >
                <option value='' disabled hidden>
                  카테고리
                </option>
                <option value='category0'>어학</option>
                <option value='category1'>IT</option>
                <option value='category2'>고시/자격증</option>
                <option value='category3'>금융</option>
                <option value='category4'>경영</option>
                <option value='category5'>디자인</option>
                <option value='category6'>예술</option>
                <option value='category7'>사진/영상</option>
                <option value='category8'>뷰티</option>
                <option value='category9'>스포츠</option>
                <option value='category10'>취미</option>
                <option value='category10'>기타</option>
              </select>

              <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                <ChevronDown />
              </div>
            </div>
          </div>
        </div>

        <div className='flex space-x-10 '>
          <div className='flex flex-col w-[440px] mb-10'>
            <span className='tm-0 mb-2.5'>지역</span>
            <div className='relative inline-block w-[440px] '>
              <select
                className='w-full h-[60px] border-[1px]  pl-4 pr-10 appearance-none rounded-[10px] '
                name='selectedRecruitmentPerson'
                defaultValue=''
                style={{ borderColor: 'var(--color-border3)' }}
              >
                <option value='' disabled hidden>
                  지역
                </option>
                <option value='country0'>서울</option>
                <option value='country1'>부산</option>
                <option value='country2'>대구</option>
                <option value='country3'>인천</option>
                <option value='country4'>광주</option>
                <option value='country5'>대전</option>
                <option value='country6'>울산</option>
                <option value='country7'>세종</option>
                <option value='country8'>경기도</option>
                <option value='country9'>충청북도</option>
                <option value='country10'>충청남도</option>
                <option value='country11'>전라북도</option>
                <option value='country12'>전라남도</option>
                <option value='country13'>경상북도</option>
                <option value='country14'>경상남도</option>
                <option value='country15'>강원도</option>
                <option value='country16'>제주도</option>
              </select>

              <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                <ChevronDown />
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[440px] mb-10'>
            <span className='tm-0 mb-2.5'>진행 방식</span>
            <div className='relative inline-block w-[440px] '>
              <select
                className='w-full h-[60px] border-[1px]  pl-4 pr-10 appearance-none rounded-[10px] '
                name='selectedRecruitmentPerson'
                defaultValue=''
                style={{ borderColor: 'var(--color-border3)' }}
              >
                <option value='' disabled hidden>
                  진행 방식
                </option>
                <option value='online'>온라인</option>
                <option value='offline'>오프라인</option>
                <option value='onofflune'>온/오프라인</option>
              </select>

              <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                <ChevronDown />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-[440px]'>
          <span className='tm-0 mb-2.5'>모집 마감일</span>
          <input
            type='date'
            className='border-[1px]  h-15 rounded-[10px] p-5 mb-10'
            style={{ borderColor: 'var(--color-border3)' }}
          ></input>
        </div>
        <div className='flex items-center  mt-10'>
          <div className='flex w-10 h-10 rounded-full bg-[#111111] justify-center items-center'>
            <span className='text-white tb2'>2</span>
          </div>
          <span className='tb2 mx-[25px]'>스터디에 대해 소개해주세요</span>
        </div>
        <hr
          className='h-0.5 my-10'
          style={{ borderColor: 'var(--color-border2)' }}
        />
        <input
          className='border-[1px] w-full h-15 rounded-[10px] p-5 mb-10'
          style={{ borderColor: 'var(--color-border3)' }}
          placeholder='제목을 입력해주세요'
        ></input>
        <div className='mb-10'>
          <ClientEditorWrapper />
        </div>
        <div className='flex justify-end'>
          <button className='button-type6 mr-[15px] hover:bg-[#f5f5f5]'>
            취소
          </button>
          <button className='button-type5 hover:bg-[#292929]'>등록</button>
        </div>
      </div>
    </>
  );
}
