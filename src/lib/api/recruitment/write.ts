import axios from 'axios';

export const writeRecruitmentPost = async (payload: {
  studyId: number;
  subject: string;
  content: string;
  remainSlots: number;
  expireDate: string;
}) => {
  try {
    const response = await axios.post(
      'https://wibby.cedartodo.uk/recruitment-posts',
      payload
    );
    return response.data;
  } catch (error) {
    console.error('post error:', error);
    throw error;
  }
};
