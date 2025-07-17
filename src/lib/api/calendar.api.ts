// 내 스터디 목록
export const getStudies = async () => {
  try {
    const res = await fetch(`${url}/api/studies`, {
      ...options,
      method: 'GET',
    });

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};

// 특정 스터디 조회
export const getStudy = async (studyId: number) => {
  try {
    const res = await fetch(`${url}/api/studies/${studyId}`, {
      ...options,
      method: 'GET',
    });

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};

// 스터디별 일정 전체 목록 조회
export const getStudyEvents = async (studyId: number) => {
  try {
    const res = await fetch(`${url}/api/teams/${studyId}/calendar`, {
      ...options,
      method: 'GET',
    });

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};

// 스터디 일정 날짜별 조회
export const getStudyDayEvents = async (studyId: number, viewDate: string) => {
  try {
    const res = await fetch(
      `${url}/api/teams/${studyId}/calendar/day?date=${viewDate}`,
      {
        ...options,
        method: 'GET',
      }
    );

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};

// 스터디팀 일정 등록
export const postStudyEvent = async (
  studyId: number,
  updateData: ScheduleInputType
) => {
  try {
    const res = await fetch(`${url}/api/teams/${studyId}/calendar`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};

// 스터디팀 일정 수정
export const putStudyEvent = async (
  studyId: number,
  calendarId: number,
  updateData: ScheduleInputType
) => {
  try {
    const res = await fetch(
      `${url}/api/teams/${studyId}/calendar/${calendarId}`,
      {
        ...options,
        method: 'PUT',
        body: JSON.stringify(updateData),
      }
    );

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};

// 스터디팀 일정 삭제
export const deleteStudyEvent = async (studyId: number, calendarId: number) => {
  try {
    const res = await fetch(
      `${url}/api/teams/${studyId}/calendar/${calendarId}`,
      {
        ...options,
        method: 'DELETE',
      }
    );

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};

// 개인 일정 전체 조회
export const getUserEvents = async (userId: number) => {
  try {
    const res = await fetch(`${url}/api/users/${userId}/calendar`, {
      ...options,
      method: 'GET',
    });

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};
// 개인 일정 날짜별 조회
export const getUserDayEvents = async (userId: number, viewDate: string) => {
  try {
    const res = await fetch(
      `${url}/api/users/${userId}/calendar/day?date=${viewDate}`,
      {
        ...options,
        method: 'GET',
      }
    );

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};
// 개인 일정 등록
export const postUserEvent = async (
  userId: number,
  updateData: UserScheduleInputType
) => {
  try {
    const res = await fetch(`${url}/api/users/${userId}/calendar`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};

// 개인 일정 수정
export const putUserEvent = async (
  userId: number,
  calendarId: number,
  updateData: UserScheduleInputType
) => {
  try {
    const res = await fetch(
      `${url}/api/users/${userId}/calendar/${calendarId}`,
      {
        ...options,
        method: 'PUT',
        body: JSON.stringify(updateData),
      }
    );

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};

// 개인 일정 삭제
export const deleteUserEvent = async (userId: number, calendarId: number) => {
  try {
    const res = await fetch(
      `${url}/api/users/${userId}/calendar/${calendarId}`,
      {
        ...options,
        method: 'DELETE',
      }
    );

    if (!res.ok) {
      console.error('API Error', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetch 실패', err);
    return { data: [] };
  }
};
