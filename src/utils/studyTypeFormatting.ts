export const studyTypeFormatting = (type: string) => {
  switch (type) {
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
