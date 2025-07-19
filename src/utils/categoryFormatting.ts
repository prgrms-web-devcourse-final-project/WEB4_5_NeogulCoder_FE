export const categoryFormatting = (category: string) => {
  switch (category) {
    case '어학':
      return 'LANGUAGE';
    case 'IT':
      return 'IT';
    case '고시/자격증':
      return 'EXAM';
    case '금융':
      return 'FINANCE';
    case '경영':
      return 'MANAGEMENT';
    case '디자인':
      return 'DESIGN';
    case '예술':
      return 'ART';
    case '사진/영상':
      return 'PHOTO_VIDEO';
    case '뷰티':
      return 'BEAUTY';
    case '스포츠':
      return 'SPORTS';
    case '취미':
      return 'HOBBY';
    case '기타':
      return 'ETC';
    case 'LANGUAGE':
      return '어학';
    case 'EXAM':
      return '고시/자격증';
    case 'FINANCE':
      return '금융';
    case 'MANAGEMENT':
      return '경영';
    case 'DESIGN':
      return '디자인';
    case 'ART':
      return '예술';
    case 'PHOTO_VIDEO':
      return '사진/영상';
    case 'BEAUTY':
      return '뷰티';
    case 'SPORTS':
      return '스포츠';
    case 'HOBBY':
      return '취미';
    case 'ETC':
      return '기타';
    default:
      return category;
  }
};
