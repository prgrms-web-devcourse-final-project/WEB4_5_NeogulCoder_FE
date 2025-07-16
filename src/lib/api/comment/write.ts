import axios from 'axios';

export const writeComment = async (
  studyId: number,
  payload: {
    title: string;
    content: string;
    category: string;
  }
) => {
  try {
    const response = await axios.post(
      `https://wibby.cedartodo.uk/api/studies/${studyId}/posts`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('post error:', error);
    throw error;
  }
};
