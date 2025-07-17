const revalidateOption = {
  next: {
    revalidate: 60 * 60 * 24,
  },
};

export const getStudyInfoData = async (studyId: number) => {
  return await (
    await fetch(`${url}/api/studies/${studyId}/info`, {
      ...options,
    })
  ).json();
};

export const getStudyHeaderData = async (studyId: number) => {
  return await (
    await fetch(`${url}/api/studies/${studyId}/header`, {
      ...options,
    })
  ).json();
};
