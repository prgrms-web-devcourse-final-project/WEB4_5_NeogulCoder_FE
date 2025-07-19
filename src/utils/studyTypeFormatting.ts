export const studyTypeFormatting = (type: string) => {
  switch (type) {
    case '온라인':
      return 'ONLINE';
    case '오프라인':
      return 'OFFLINE';
    case '온/오프라인':
      return 'HYBRID';
    case 'ONLINE':
      return '온라인';
    case 'OFFLINE':
      return '오프라인';
    case 'HYBRID':
      return '온/오프라인';
    default:
      return type;
  }
};
