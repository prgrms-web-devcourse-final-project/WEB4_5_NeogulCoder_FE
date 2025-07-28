// import type { NextConfig } from 'next';

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '**', // 모든 경로 허용
      },
      {
        protocol: 'https',
        hostname: 'www.lorempixel.com',
        pathname: '**', // 모든 경로 허용
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
        pathname: '**', // 모든 경로 허용
      },
      {
        protocol: 'https',
        hostname: 'placekitten.com',
        pathname: '**', // 모든 경로 허용
      },
    ],
  },
};

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     // 팀채팅 임시 프로필 사진 때문에 넣은거. 추후에 지워도 됨
//     remotePatterns: [
//       new URL('https://i.pinimg.com/**'),
//       new URL('https://dummyimage.com/**'),
//       new URL('http://localhost:8083/**'),
//       new URL('https://wibby.com/profile/**'),

//     ],
//   },
// };

// export default nextConfig;
