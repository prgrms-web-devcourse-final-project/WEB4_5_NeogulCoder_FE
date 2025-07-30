'use client';

import { ChevronDown, Calendar } from 'lucide-react';
import ClientEditorWrapper from '@/components/common/ClientEditorWrapper';
import { useEffect, useRef, useState } from 'react';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { writeRecruitmentPost } from '@/lib/api/recruitment/write';
import { fetchStudy } from '@/lib/api/recruitment/fetchStudy';
import { fetchStudyList } from '@/lib/api/recruitment/fetchStudyList';
import { formatDate } from '@/utils/formatDate';
import StudyListModal from '@/components/study/StudyListModal';
import RemainSlotModal from '@/components/study/RemainSlot';
import { useRouter } from 'next/navigation';
import RecruitmentFormSkeleton from '@/components/recruitment/RecruitmentFormSkeleton';
import { toast } from 'react-toastify';

export default function RecruitmentWritePage() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [studyId, setStudyId] = useState<number | ''>('');
  const [remainSlots, setRemainSlots] = useState<number | null>(null);
  const [expiredDate, setExpiredDate] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [studyType, setStudyType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [content, setContent] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [isStudyOpen, setIsStudyOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayText =
    remainSlots === null
      ? '1명 ~ 10명 이상'
      : remainSlots === 10
      ? '10명 이상'
      : `${remainSlots}명`;
  const [studyList, setStudyList] = useState<
    { studyId: number; name: string }[]
  >([]);

  const editorRef = useRef<ToastEditor>(null);
  const categoryDisplayNames: Record<string, string> = {
    LANGUAGE: '어학',
    IT: 'IT',
    EXAM: '고시/자격증',
    FINANCE: '금융',
    MANAGEMENT: '경영',
    DESIGN: '디자인',
    ART: '예술',
    PHOTO_VIDEO: '사진/영상',
    BEAUTY: '뷰티',
    SPORTS: '스포츠',
    HOBBY: '취미',
    ETC: '기타',
  };

  const StudyTypeDisplayNames: Record<string, string> = {
    ONLINE: '온라인',
    OFFLINE: '오프라인',
    HYBRID: '온/오프라인',
  };

  const handleFetchData = async () => {
    setIsClick(true);
    try {
      const data = await fetchStudy(Number(studyId));
      console.log(studyId);
      setCategory(data.category);
      setLocation(data.location);
      setStudyType(data.studyType);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
      setRemainSlots(data.remainSlots);
    } catch (error) {
      console.error('데이터 불러오기 실패ㅠㅠ:', error);
    }
  };

  useEffect(() => {
    const loadStudyList = async () => {
      try {
        setIsLoading(true);
        const data = await fetchStudyList();
        setStudyList(data.studyInfos);
      } catch (error) {
        console.error('스터디 리스트 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudyList();
  }, []);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!isClick) {
      toast.warning('스터디를 선택해주세요.');
      setIsSubmitting(false);
      return;
    }

    if (!expiredDate) {
      toast.warning('모집 마감일을 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    if (remainSlots === null) {
      toast.warning('모집 인원을 선택해주세요.');
      setIsSubmitting(false);
      return;
    }

    if (!subject.trim()) {
      toast.warning('제목을 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    const instance = editorRef.current?.getInstance();
    const content = instance?.getMarkdown() || '';

    if (!content.trim()) {
      toast.warning('본문 내용을 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    // 모든 조건 충족 시, API 호출
    const payload = {
      studyId: studyId,
      subject: subject,
      content: content,
      recruitmentCount: Number(remainSlots),
      expiredDate: new Date(expiredDate).toISOString(),
    };

    try {
      const data = await writeRecruitmentPost(payload);
      const postId = data.data;
      toast.success('게시글 작성이 완료되었습니다!');
      router.push(`/recruitment/detail/${postId}`);
    } catch (error) {
      console.error('작성 실패', error);
      toast.error('게시글 작성 중 오류가 발생하였습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <RecruitmentFormSkeleton />
      ) : (
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
            <div className='flex items-center'>
              <div className='relative inline-block w-[320px] ml-14.5 mr-5'>
                <div className='relative'>
                  <button
                    type='button'
                    style={{ borderColor: 'var(--color-border3)' }}
                    className={`w-[320px] h-[60px] rounded-[10px] flex items-center justify-between p-5 border  ${
                      studyId
                        ? 'border-main text-text1 tm4'
                        : 'border-main/10 text-text1/50 tm4'
                    }`}
                    onClick={() => setIsStudyOpen((prev) => !prev)}
                  >
                    <p
                      className={`mr-1 ${
                        !studyId ? 'text-gray-400' : 'text-black'
                      }`}
                    >
                      {studyId
                        ? studyList.find((study) => study.studyId === studyId)
                            ?.name
                        : '스터디를 선택해주세요'}
                    </p>
                    <ChevronDown className='w-6 h-6' />
                  </button>

                  {isStudyOpen && (
                    <div className='absolute top-15 left-0 z-10'>
                      <StudyListModal
                        studyList={studyList}
                        onSelect={(selectedId) => {
                          setStudyId(selectedId);
                          setIsStudyOpen(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <button
                className='button-type7 hover:bg-[#292929]'
                onClick={handleFetchData}
                disabled={studyId === ''}
              >
                가져오기
              </button>
            </div>
          </div>
          <hr
            className='h-0.5 my-10'
            style={{ borderColor: 'var(--color-border2)' }}
          />
          <div className='flex space-x-10'>
            <div className='flex flex-col w-[440px]  '>
              <span className='tm-0 mb-2.5'>시작 날짜</span>
              <div className='flex h-15 rounded-[10px] p-5 mb-10 cursor-not-allowed bg-gray4 justify-between'>
                <div>
                  <span>
                    {startDate ? formatDate(startDate) : '연도-월-일'}
                  </span>
                </div>
                <div>
                  <Calendar className='w-4 h-4' />
                </div>
              </div>
            </div>
            <div className='flex flex-col w-[440px]  '>
              <span className='tm-0 mb-2.5'>종료 날짜</span>
              <div className='flex h-15 rounded-[10px] p-5 mb-10 cursor-not-allowed bg-gray4 justify-between'>
                <div>
                  <span>{endDate ? formatDate(endDate) : '연도-월-일'}</span>
                </div>
                <div>
                  <Calendar className='w-4 h-4' />
                </div>
              </div>
            </div>
          </div>
          <div className='flex space-x-10'>
            <div className='flex flex-col w-[440px] mb-10'>
              <span className='tm-0 mb-2.5'>모집 인원</span>
              <div className='relative inline-block w-[440px]'>
                <button
                  type='button'
                  style={{ borderColor: 'var(--color-border3)' }}
                  className={`w-full h-[60px] rounded-[10px] flex items-center justify-between p-5 border mb-6 text-left ${
                    remainSlots !== null ? 'text-black' : 'text-gray-400'
                  }`}
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <span>{displayText}</span>
                  <ChevronDown className='w-4 h-4' />
                </button>

                {isOpen && (
                  <div className='absolute top-[60px] left-0 z-10'>
                    <RemainSlotModal
                      onSelect={(value) => {
                        setRemainSlots(value);
                        setIsOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col w-[440px] mb-10'>
              <span className='tm-0 mb-2.5'>카테고리</span>
              <div className='relative inline-block w-[440px] '>
                <div className='flex  items-center w-full h-[60px] cursor-not-allowed bg-gray4 pl-4 pr-10 appearance-none rounded-[10px] '>
                  <span>
                    {category ? categoryDisplayNames[category] : '카테고리'}
                  </span>
                </div>

                <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                  <ChevronDown />
                </div>
              </div>
            </div>
          </div>
          <div className='flex space-x-10 '>
            <div className='flex flex-col w-[440px] mb-10'>
              <span className='tm-0 mb-2.5'>진행 방식</span>
              <div className='relative inline-block w-[440px] '>
                <div className='flex  items-center w-full h-[60px] cursor-not-allowed bg-gray4 pl-4 pr-10 appearance-none rounded-[10px] '>
                  {studyType ? StudyTypeDisplayNames[studyType] : '카테고리'}
                </div>

                <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                  <ChevronDown />
                </div>
              </div>
            </div>
            <div className='flex flex-col w-[440px] mb-10'>
              <span className='tm-0 mb-2.5'>지역</span>
              <div className='relative inline-block w-[440px] '>
                <div className='flex  items-center w-full h-[60px] cursor-not-allowed bg-gray4 pl-4 pr-10 appearance-none rounded-[10px] '>
                  <span>{location ? location : '지역'}</span>
                </div>

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
              className='border-[1px] h-15 rounded-[10px] p-5 mb-10'
              style={{ borderColor: 'var(--color-border3)' }}
              value={expiredDate}
              onChange={(e) => setExpiredDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]} // 선택 가능한 최소 날짜를 오늘로 지정
              max={endDate.split('T')[0]}
            />
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
            className='border-[1px] w-full h-15 rounded-[10px] p-5 mb-10 tm4'
            style={{ borderColor: 'var(--color-border3)' }}
            placeholder='제목을 입력해주세요'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></input>
          <div className='mb-10'>
            <ClientEditorWrapper editorRef={editorRef} />
          </div>
          <div className='flex justify-end'>
            <button
              className='button-type6 mr-[15px] hover:bg-[#f5f5f5]'
              onClick={() => router.push(`/#recruit`)}
            >
              취소
            </button>
            <button
              className='button-type5 hover:bg-[#292929]'
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              등록
            </button>
          </div>
        </div>
      )}
    </>
  );
}
