import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 팀채팅 임시 프로필 사진 때문에 넣은거. 추후에 지워도 됨
    remotePatterns: [
      new URL('https://www.lorempixel.com/**'),
      new URL('https://placeimg.com/**'),
      new URL('http://localhost:8083/**'),
      new URL('https://wibby.com/profile/**'),
      new URL('https://placekitten.com/**'),
      new URL('https://storage.googleapis.com/neogulcoder-wibby/**'),
      new URL('https://placekitten.com/**'),
      new URL('https://example.com/**'),
    ],
  },
};

export default nextConfig;
