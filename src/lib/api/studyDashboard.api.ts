const revalidateOption = {
  next: {
    revalidate: 60 * 60 * 24,
  },
};

export const getStudyDashBoardData = async (studyId: number) => {
  return await (
    await fetch(`${url}/api/studies/${studyId}`, {
      ...options,
      ...revalidateOption,
    })
  ).json();
};
export const getStudyHeaderData = async (studyId: number) => {
  return await (
    await fetch(`${url}/api/studies/${studyId}/header`, {
      ...options,
      ...revalidateOption,
    })
  ).json();
};
