import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'hadash_students_data';

const defaultStudents = [
  {
    id: '1',
    full_name: 'Kwame Asante',
    student_id: 'HDS-001',
    pin: '1234',
    class_level: 'JHS 1',
    gender: 'Male',
    status: 'Active',
    parent_name: 'Kofi Asante',
    parent_phone: '0244001001',
    address: 'Accra, Ghana',
    date_of_birth: '2012-03-15',
    created_date: new Date().toISOString(),
  },
  {
    id: '2',
    full_name: 'Ama Mensah',
    student_id: 'HDS-002',
    pin: '2345',
    class_level: 'JHS 1',
    gender: 'Female',
    status: 'Active',
    parent_name: 'Akosua Mensah',
    parent_phone: '0244002002',
    address: 'Kumasi, Ghana',
    date_of_birth: '2012-06-22',
    created_date: new Date().toISOString(),
  },
  {
    id: '3',
    full_name: 'Yaw Boateng',
    student_id: 'HDS-003',
    pin: '3456',
    class_level: 'JHS 2',
    gender: 'Male',
    status: 'Active',
    parent_name: 'Kweku Boateng',
    parent_phone: '0244003003',
    address: 'Takoradi, Ghana',
    date_of_birth: '2011-09-10',
    created_date: new Date().toISOString(),
  },
  {
    id: '4',
    full_name: 'Abena Osei',
    student_id: 'HDS-004',
    pin: '4567',
    class_level: 'JHS 2',
    gender: 'Female',
    status: 'Active',
    parent_name: 'Yaa Osei',
    parent_phone: '0244004004',
    address: 'Cape Coast, Ghana',
    date_of_birth: '2011-12-05',
    created_date: new Date().toISOString(),
  },
  {
    id: '5',
    full_name: 'Kofi Adjei',
    student_id: 'HDS-005',
    pin: '5678',
    class_level: 'JHS 3',
    gender: 'Male',
    status: 'Active',
    parent_name: 'Kojo Adjei',
    parent_phone: '0244005005',
    address: 'Tema, Ghana',
    date_of_birth: '2010-02-18',
    created_date: new Date().toISOString(),
  },
  {
    id: '6',
    full_name: 'Efua Darko',
    student_id: 'HDS-006',
    pin: '6789',
    class_level: 'JHS 3',
    gender: 'Female',
    status: 'Active',
    parent_name: 'Adwoa Darko',
    parent_phone: '0244006006',
    address: 'Tamale, Ghana',
    date_of_birth: '2010-07-30',
    created_date: new Date().toISOString(),
  },
  {
    id: '7',
    full_name: 'Nii Lartey',
    student_id: 'HDS-007',
    pin: '7890',
    class_level: 'JHS 1',
    gender: 'Male',
    status: 'Active',
    parent_name: 'Nii Lartey Sr',
    parent_phone: '0244007007',
    address: 'Accra, Ghana',
    date_of_birth: '2012-11-14',
    created_date: new Date().toISOString(),
  },
  {
    id: '8',
    full_name: 'Akua Frimpong',
    student_id: 'HDS-008',
    pin: '8901',
    class_level: 'JHS 2',
    gender: 'Female',
    status: 'Active',
    parent_name: 'Ama Frimpong',
    parent_phone: '0244008008',
    address: 'Sunyani, Ghana',
    date_of_birth: '2011-04-25',
    created_date: new Date().toISOString(),
  },
];

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStudents));
  return defaultStudents;
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const studentService = {
  list: () => Promise.resolve([...load()]),

  findByCredentials: (studentId, pin) => {
    const students = load();
    return Promise.resolve(
      students.find(
        (s) =>
          s.student_id.trim().toLowerCase() === studentId.trim().toLowerCase() &&
          s.pin === pin
      ) || null
    );
  },

  create: (data) => {
    const students = load();
    const existing = students.find(
      (s) => s.student_id.trim().toLowerCase() === data.student_id.trim().toLowerCase()
    );
    if (existing) {
      return Promise.reject(new Error('Student ID already exists'));
    }

    const newStudent = {
      ...data,
      id: uuidv4(),
      created_date: new Date().toISOString(),
    };

    save([...students, newStudent]);
    return Promise.resolve(newStudent);
  },

  update: (id, data) => {
    const students = load();
    const existing = students.find(
      (s) =>
        s.id !== id &&
        s.student_id.trim().toLowerCase() === data.student_id.trim().toLowerCase()
    );
    if (existing) {
      return Promise.reject(new Error('Student ID already exists'));
    }

    const updated = students.map((s) => (s.id === id ? { ...s, ...data } : s));
    save(updated);
    return Promise.resolve(updated.find((s) => s.id === id));
  },

  delete: (id) => {
    const students = load();
    save(students.filter((s) => s.id !== id));
    return Promise.resolve();
  },
};