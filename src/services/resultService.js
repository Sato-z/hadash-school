import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'hadash_results_data';

const defaultResults = [
  {
    id: 'r1',
    student_id: 'HDS-001',
    student_name: 'Kwame Asante',
    class_level: 'JHS 1',
    academic_year: '2025/2026',
    term: 'Term 1',
    english: 78,
    mathematics: 85,
    science: 72,
    social_studies: 80,
    ict: 90,
    french: 65,
    rme: 88,
    creative_arts: 75,
    ghanaian_language: 70,
    total_score: 703,
    average_score: 78.1,
    position: 2,
    remarks: 'Excellent performance. Keep it up!',
    created_date: new Date().toISOString(),
  },
  {
    id: 'r2',
    student_id: 'HDS-002',
    student_name: 'Ama Mensah',
    class_level: 'JHS 1',
    academic_year: '2025/2026',
    term: 'Term 1',
    english: 92,
    mathematics: 88,
    science: 85,
    social_studies: 91,
    ict: 87,
    french: 79,
    rme: 94,
    creative_arts: 82,
    ghanaian_language: 86,
    total_score: 784,
    average_score: 87.1,
    position: 1,
    remarks: 'Outstanding! Top of the class.',
    created_date: new Date().toISOString(),
  },
  {
    id: 'r3',
    student_id: 'HDS-003',
    student_name: 'Yaw Boateng',
    class_level: 'JHS 2',
    academic_year: '2025/2026',
    term: 'Term 1',
    english: 60,
    mathematics: 74,
    science: 68,
    social_studies: 55,
    ict: 80,
    french: 50,
    rme: 72,
    creative_arts: 65,
    ghanaian_language: 58,
    total_score: 582,
    average_score: 64.7,
    position: 3,
    remarks: 'Good effort. Room for improvement in French.',
    created_date: new Date().toISOString(),
  },
  {
    id: 'r4',
    student_id: 'HDS-005',
    student_name: 'Kofi Adjei',
    class_level: 'JHS 3',
    academic_year: '2025/2026',
    term: 'Term 1',
    english: 55,
    mathematics: 62,
    science: 58,
    social_studies: 60,
    ict: 70,
    french: 48,
    rme: 65,
    creative_arts: 72,
    ghanaian_language: 55,
    total_score: 545,
    average_score: 60.6,
    position: 4,
    remarks: 'Must put in more effort for BECE preparation.',
    created_date: new Date().toISOString(),
  },
];

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultResults));
  return defaultResults;
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const resultService = {
  list: () => Promise.resolve([...load()]),

  create: (data) => {
    const results = load();
    const newResult = {
      ...data,
      id: uuidv4(),
      created_date: new Date().toISOString(),
    };
    save([...results, newResult]);
    return Promise.resolve(newResult);
  },

  update: (id, data) => {
    const results = load();
    const updated = results.map((r) => (r.id === id ? { ...r, ...data } : r));
    save(updated);
    return Promise.resolve(updated.find((r) => r.id === id));
  },

  delete: (id) => {
    const results = load();
    save(results.filter((r) => r.id !== id));
    return Promise.resolve();
  },
};