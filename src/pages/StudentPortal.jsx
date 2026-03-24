import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp,
  Award,
  BookOpen,
  LogOut,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getGrade, subjects } from '@/components/shared/GradeHelper';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { resultService } from '@/services/resultService';
import { timetableService } from '@/services/timetableService';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [
  { num: 1, time: '7:30 - 8:15' },
  { num: 2, time: '8:15 - 9:00' },
  { num: 3, time: '9:00 - 9:45' },
  { num: 4, time: '9:45 - 10:15', isBreak: true, label: 'Break' },
  { num: 5, time: '10:15 - 11:00' },
  { num: 6, time: '11:00 - 11:45' },
  { num: 7, time: '11:45 - 12:30' },
  { num: 8, time: '12:30 - 1:00', isBreak: true, label: 'Lunch' },
];

const subjectColors = {
  'English Language': 'bg-blue-50 text-blue-800 border-blue-200',
  Mathematics: 'bg-green-50 text-green-800 border-green-200',
  'Integrated Science': 'bg-purple-50 text-purple-800 border-purple-200',
  'Social Studies': 'bg-amber-50 text-amber-800 border-amber-200',
  ICT: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  French: 'bg-pink-50 text-pink-800 border-pink-200',
  RME: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  'Creative Arts': 'bg-orange-50 text-orange-800 border-orange-200',
  'Ghanaian Language': 'bg-emerald-50 text-emerald-800 border-emerald-200',
};

export default function StudentPortal() {
  const navigate = useNavigate();
  const [studentProfile, setStudentProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('results');
  const [selectedTerm, setSelectedTerm] = useState('all');

  useEffect(() => {
    const stored = sessionStorage.getItem('hadash_student');
    if (!stored) {
      navigate('/SchoolLogin');
      return;
    }
    setStudentProfile(JSON.parse(stored));
  }, [navigate]);

  const { data: allResults = [] } = useQuery({
    queryKey: ['results'],
    queryFn: resultService.list,
    enabled: !!studentProfile,
  });

  const { data: timetableEntries = [] } = useQuery({
    queryKey: ['timetable'],
    queryFn: timetableService.list,
    enabled: !!studentProfile,
  });

  if (!studentProfile) return null;

  const myResults = allResults.filter((r) => r.student_id === studentProfile.student_id);
  const filteredResults =
    selectedTerm === 'all' ? myResults : myResults.filter((r) => r.term === selectedTerm);

  const overallAvg =
    myResults.length > 0
      ? (myResults.reduce((sum, r) => sum + (r.average_score || 0), 0) / myResults.length).toFixed(1)
      : '—';

  const bestScore =
    myResults.length > 0
      ? Math.max(...myResults.map((r) => r.average_score || 0)).toFixed(1)
      : '—';

  const handleLogout = () => {
    sessionStorage.removeItem('hadash_student');
    navigate('/SchoolLogin');
  };

  const classEntries = timetableEntries.filter(
    (e) => e.class_level === studentProfile.class_level
  );

  const getEntry = (day, num) => classEntries.find((e) => e.day === day && e.period === num);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="kente-border" />

      <header className="bg-[#1B5E20] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D4A017] flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-[#1B5E20]" />
          </div>
          <div>
            <span className="font-bold text-sm">Hadash Educational School</span>
            <p className="text-green-200 text-xs">Student Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-sm">{studentProfile.full_name}</p>
            <p className="text-green-200 text-xs">
              {studentProfile.class_level} · {studentProfile.student_id}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-white/5 -translate-y-12 translate-x-12" />
          <p className="text-green-200 text-sm mb-1">Welcome back,</p>
          <h1 className="text-2xl font-bold mb-1">{studentProfile.full_name}</h1>
          <p className="text-green-200 text-sm">
            {studentProfile.class_level} · Academic Year 2025/2026
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border p-4 text-center">
            <TrendingUp className="w-5 h-5 text-[#1B5E20] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1B5E20]">{overallAvg}</p>
            <p className="text-xs text-gray-500 mt-1">Overall Average</p>
          </div>

          <div className="bg-white rounded-2xl border p-4 text-center">
            <Award className="w-5 h-5 text-[#D4A017] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#D4A017]">{bestScore}</p>
            <p className="text-xs text-gray-500 mt-1">Best Score</p>
          </div>

          <div className="bg-white rounded-2xl border p-4 text-center">
            <BookOpen className="w-5 h-5 text-orange-700 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-700">{myResults.length}</p>
            <p className="text-xs text-gray-500 mt-1">Terms Recorded</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {[
            { key: 'results', icon: BookOpen, label: 'My Results' },
            { key: 'timetable', icon: Calendar, label: 'My Timetable' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-[#1B5E20] text-white shadow-lg'
                  : 'bg-white border text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'results' && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm text-gray-500 font-medium">Filter by:</span>
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger className="w-36 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Terms</SelectItem>
                  <SelectItem value="Term 1">Term 1</SelectItem>
                  <SelectItem value="Term 2">Term 2</SelectItem>
                  <SelectItem value="Term 3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredResults.length === 0 ? (
              <div className="bg-white rounded-2xl border p-12 text-center">
                <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400">No results available yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredResults.map((r) => {
                  const grade = getGrade(r.average_score || 0);
                  const chartData = subjects
                    .filter((s) => r[s.key] !== undefined && r[s.key] !== null && r[s.key] !== '')
                    .map((s) => ({
                      name: s.label.split(' ')[0],
                      score: r[s.key],
                      fullName: s.label,
                    }));

                  return (
                    <div key={r.id} className="bg-white rounded-2xl border overflow-hidden shadow-sm">
                      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-50 to-amber-50 border-b">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {r.term} — {r.academic_year}
                          </h3>
                          <p className="text-sm text-gray-500">{r.class_level}</p>
                        </div>

                        <div className="text-right">
                          <Badge className={`text-sm px-3 py-1 ${grade.color}`}>
                            Grade {grade.grade} — {grade.label}
                          </Badge>
                          <p className="text-xs text-gray-400 mt-1">
                            Avg: <strong className="text-[#1B5E20]">{r.average_score?.toFixed(1)}</strong>
                            {r.position && (
                              <>
                                {' '}
                                · Position: <strong>{r.position}</strong>
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-5">
                          {subjects.map((sub) => {
                            const score = r[sub.key];
                            if (score === undefined || score === null || score === '') return null;
                            const g = getGrade(score);

                            return (
                              <div key={sub.key} className="text-center p-3 rounded-xl bg-gray-50 border">
                                <p className="text-[10px] text-gray-500 font-medium uppercase leading-tight">
                                  {sub.label.split(' ')[0]}
                                </p>
                                <p className="text-xl font-bold text-gray-900 mt-1">{score}</p>
                                <span
                                  className={`text-[9px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${g.color}`}
                                >
                                  {g.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {chartData.length > 0 && (
                          <div className="h-44 mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                                <Tooltip
                                  formatter={(value, name, props) => [value, props.payload.fullName]}
                                  contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                                />
                                <Bar dataKey="score" fill="#1B5E20" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        )}

                        <div className="flex gap-6 text-sm border-t pt-4">
                          <span className="text-gray-500">
                            Total Score: <strong className="text-gray-900">{r.total_score}</strong>
                          </span>
                          <span className="text-gray-500">
                            Average:{' '}
                            <strong className="text-[#1B5E20]">{r.average_score?.toFixed(1)}</strong>
                          </span>
                        </div>

                        {r.remarks && (
                          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                            <p className="text-xs font-semibold text-amber-700 mb-1">
                              Teacher&apos;s Remarks
                            </p>
                            <p className="text-sm text-gray-700">{r.remarks}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'timetable' && (
          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="p-5 border-b bg-green-50">
              <h2 className="font-bold text-gray-900">
                Weekly Timetable — {studentProfile.class_level}
              </h2>
              <p className="text-sm text-gray-500">Academic Year 2025/2026</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1B5E20] text-white">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-28">
                      Period
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {periods.map((p) => (
                    <tr key={p.num} className={p.isBreak ? 'bg-amber-50' : 'border-b hover:bg-gray-50'}>
                      <td className="px-4 py-3">
                        <p className="text-xs font-bold text-gray-700">
                          {p.isBreak ? p.label : `Period ${p.num}`}
                        </p>
                        <p className="text-[10px] text-gray-400">{p.time}</p>
                      </td>

                      {days.map((day) => {
                        if (p.isBreak) {
                          return (
                            <td
                              key={day}
                              className="px-3 py-3 text-center text-xs text-amber-600 font-medium"
                            >
                              {p.label}
                            </td>
                          );
                        }

                        const entry = getEntry(day, p.num);
                        const color = entry
                          ? subjectColors[entry.subject] || 'bg-gray-50 text-gray-700 border-gray-200'
                          : '';

                        return (
                          <td key={day} className="px-2 py-2">
                            {entry ? (
                              <div className={`rounded-lg border p-2 text-center ${color}`}>
                                <p className="text-xs font-semibold">{entry.subject}</p>
                                {entry.teacher && (
                                  <p className="text-[10px] opacity-70 mt-0.5">{entry.teacher}</p>
                                )}
                              </div>
                            ) : (
                              <div className="text-center text-xs text-gray-300">—</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}