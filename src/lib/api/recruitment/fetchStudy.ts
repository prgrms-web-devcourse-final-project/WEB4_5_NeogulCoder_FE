import axios from 'axios';

export const fetchStudyInfo = async (studyId: string) => {
  const res = await axios.get(
    `https://wibby.cedartodo.uk/recruitment-posts/studies/${studyId}`
  );
  return res.data.data;
};
