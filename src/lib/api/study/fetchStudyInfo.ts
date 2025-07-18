import axios from 'axios';

export const fetchStudyInfo = async (studyId: number, postId: number) => {
  const res = await axios.get(
    `https://wibby.cedartodo.uk/api/stuides/${studyId}/posts/${postId}`
  );
  return res.data.data;
};
