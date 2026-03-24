import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'hadash_timetable_data';

const defaultEntries = [
  { id: 't1', class_level: 'JHS 1', day: 'Monday', period: 1, time_slot: '7:30 - 8:15', subject: 'English Language', teacher: 'Mr. Mensah' },
  { id: 't2', class_level: 'JHS 1', day: 'Monday', period: 2, time_slot: '8:15 - 9:00', subject: 'Mathematics', teacher: 'Mrs. Boateng' },
  { id: 't3', class_level: 'JHS 1', day: 'Monday', period: 3, time_slot: '9:00 - 9:45', subject: 'Integrated Science', teacher: 'Mr. Asante' },
  { id: 't4', class_level: 'JHS 1', day: 'Monday', period: 5, time_slot: '10:15 - 11:00', subject: 'Social Studies', teacher: 'Mrs. Osei' },
  { id: 't5', class_level: 'JHS 1', day: 'Tuesday', period: 1, time_slot: '7:30 - 8:15', subject: 'Mathematics', teacher: 'Mrs. Boateng' },
  { id: 't6', class_level: 'JHS 1', day: 'Tuesday', period: 2, time_slot: '8:15 - 9:00', subject: 'French', teacher: 'Mr. Adjei' },
  { id: 't7', class_level: 'JHS 1', day: 'Wednesday', period: 1, time_slot: '7:30 - 8:15', subject: 'ICT', teacher: 'Mr. Darko' },
  { id: 't8', class_level: 'JHS 1', day: 'Wednesday', period: 2, time_slot: '8:15 - 9:00', subject: 'RME', teacher: 'Mrs. Frimpong' },
  { id: 't9', class_level: 'JHS 1', day: 'Thursday', period: 1, time_slot: '7:30 - 8:15', subject: 'Creative Arts', teacher: 'Mr. Lartey' },
  { id: 't10', class_level: 'JHS 1', day: 'Friday', period: 1, time_slot: '7:30 - 8:15', subject: 'Ghanaian Language', teacher: 'Mrs. Acheampong' },
  { id: 't11', class_level: 'JHS 2', day: 'Monday', period: 1, time_slot: '7:30 - 8:15', subject: 'Mathematics', teacher: 'Mr. Kwarteng' },
  { id: 't12', class_level: 'JHS 2', day: 'Monday', period: 2, time_slot: '8:15 - 9:00', subject: 'English Language', teacher: 'Mrs. Tetteh' },
  { id: 't13', class_level: 'JHS 2', day: 'Tuesday', period: 1, time_slot: '7:30 - 8:15', subject: 'Integrated Science', teacher: 'Mr. Asante' },
  { id: 't14', class_level: 'JHS 3', day: 'Monday', period: 1, time_slot: '7:30 - 8:15', subject: 'Mathematics', teacher: 'Mr. Kwarteng' },
  { id: 't15', class_level: 'JHS 3', day: 'Monday', period: 2, time_slot: '8:15 - 9:00', subject: 'English Language', teacher: 'Mrs. Tetteh' },
  { id: 't16', class_level: 'JHS 3', day: 'Tuesday', period: 1, time_slot: '7:30 - 8:15', subject: 'Social Studies', teacher: 'Mrs. Osei' },
];

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEntries));
  return defaultEntries;
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const timetableService = {
  list: () => Promise.resolve([...load()]),

  create: (data) => {
    const entries = load();
    const newEntry = { ...data, id: uuidv4() };
    save([...entries, newEntry]);
    return Promise.resolve(newEntry);
  },

  update: (id, data) => {
    const entries = load();
    const updated = entries.map((e) => (e.id === id ? { ...e, ...data } : e));
    save(updated);
    return Promise.resolve(updated.find((e) => e.id === id));
  },

  delete: (id) => {
    const entries = load();
    save(entries.filter((e) => e.id !== id));
    return Promise.resolve();
  },
};