export const calculateTotalScore = (
  attendance?: number,
  midterm?: number,
  final?: number
): number | undefined => {
  if (!attendance || !midterm || !final) return undefined;
  
  // Công thức: 10% chuyên cần + 40% giữa kỳ + 50% cuối kỳ
  const total = (attendance * 0.1) + (midterm * 0.4) + (final * 0.5);
  return Math.round(total * 100) / 100;
};

export const getGradeStatus = (score?: number): string => {
  if (!score) return '-';
  if (score >= 8.5) return 'A';
  if (score >= 7.0) return 'B';
  if (score >= 5.5) return 'C';
  if (score >= 4.0) return 'D';
  return 'F';
};

export const validateScore = (score: number, type: 'attendance' | 'exam'): boolean => {
  if (type === 'attendance') {
    return score >= 0 && score <= 100;
  }
  return score >= 0 && score <= 10;
};
