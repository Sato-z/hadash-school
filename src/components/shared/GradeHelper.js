export function getGrade(score) {
  if (score >= 80) return { grade: '1', label: 'Excellent', color: 'text-green-700 bg-green-50' };
  if (score >= 70) return { grade: '2', label: 'Very Good', color: 'text-emerald-700 bg-emerald-50' };
  if (score >= 60) return { grade: '3', label: 'Good', color: 'text-blue-700 bg-blue-50' };
  if (score >= 55) return { grade: '4', label: 'Credit', color: 'text-amber-700 bg-amber-50' };
  if (score >= 50) return { grade: '5', label: 'Pass', color: 'text-orange-700 bg-orange-50' };
  if (score >= 40) return { grade: '6', label: 'Weak Pass', color: 'text-orange-800 bg-orange-50' };
  if (score >= 30) return { grade: '7', label: 'Fail', color: 'text-red-600 bg-red-50' };
  if (score >= 20) return { grade: '8', label: 'Fail', color: 'text-red-700 bg-red-50' };
  return { grade: '9', label: 'Fail', color: 'text-red-800 bg-red-100' };
}

export const subjects = [
  { key: 'english', label: 'English Language' },
  { key: 'mathematics', label: 'Mathematics' },
  { key: 'science', label: 'Integrated Science' },
  { key: 'social_studies', label: 'Social Studies' },
  { key: 'ict', label: 'ICT' },
  { key: 'french', label: 'French' },
  { key: 'rme', label: 'RME' },
  { key: 'creative_arts', label: 'Creative Arts' },
  { key: 'ghanaian_language', label: 'Ghanaian Language' },
];