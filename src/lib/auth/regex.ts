// 비밀번호, 특수문자 x / 8-20자 사이
export const passwordRegex = /^[a-zA-Z0-9]{8,20}$/;

// 닉네임, 한글/영문/숫자/2~10자 사이
export const nicknameRegex = /^.{2,10}$/;
