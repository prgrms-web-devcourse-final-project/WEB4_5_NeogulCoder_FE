import axiosInstance from '@/lib/api/axiosInstance';

export const createStudy = async (formData: FormData) => {
  try {
    const res = await axiosInstance.post('api/studies', formData);

    return res.data;
  } catch (error) {
    console.error('Study creation error:', error);
    throw error;
  }
};
