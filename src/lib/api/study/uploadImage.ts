import axiosInstance from '@/lib/api/axiosInstance';

export const uploadImage = async (blob: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append('file', blob);

  const response = await axiosInstance.post(
    '/api/studies/posts/images',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  const imageUrl = response?.data?.message;
  if (!imageUrl) {
    throw new Error('이미지 URL이 응답에 없습니다.');
  }

  return imageUrl;
};
