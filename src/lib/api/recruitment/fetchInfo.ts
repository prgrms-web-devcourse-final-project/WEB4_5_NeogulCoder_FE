import axios from 'axios';

export const fetchInfo = async (recruitmentPostId: string) => {
  const res = await axios.get(
    `https://wibby.cedartodo.uk/recruitment-posts/${recruitmentPostId}`
  );
  return res.data.data;
};
