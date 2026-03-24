import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, ClipboardList, GraduationCap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '@/components/shared/StatCard';
import PageHeader from '@/components/shared/PageHeader';
import { studentService } from '@/services/studentService';
import { resultService } from '@/services/resultService';

export default function Dashboard() {
  const { data: students = [] } = useQuery({ queryKey: ['students'], queryFn: studentService.list });
  const { data: results = [] } = useQuery({ queryKey: ['results'], queryFn: resultService.list });

  const activeStudents = students.filter((s) => s.status === 'Active');
  const jhs1 = students.filter((s) => s.class_level === 'JHS 1').length;
  const jhs2 = students.filter((s) => s.class_level === 'JHS 2').length;
  const jhs3 = students.filter((s) => s.class_level === 'JHS 3').length;
  const avgScore =
    results.length > 0
      ? (results.reduce((sum, r) => sum + (r.average_score || 0), 0) / results.length).toFixed(1)
      : '—';

  const recentResults = [...results]
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
    .slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Welcome to Hadash Educational School Management" />
      <div className="kente-border rounded-full mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Students"
          value={students.length}
          icon={Users}
          color="green"
          subtitle={`${activeStudents.length} active`}
        />
        <StatCard title="JHS 1" value={jhs1} icon={GraduationCap} color="gold" />
        <StatCard
          title="JHS 2 & 3"
          value={jhs2 + jhs3}
          icon={GraduationCap}
          color="brown"
          subtitle={`JHS 2: ${jhs2} | JHS 3: ${jhs3}`}
        />
        <StatCard
          title="Avg. Score"
          value={avgScore}
          icon={TrendingUp}
          color="green"
          subtitle={`${results.length} results recorded`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/Students"
              className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1B5E20] flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">Manage Students</p>
                <p className="text-xs text-gray-500">Add, edit, or view students</p>
              </div>
            </Link>

            <Link
              to="/Results"
              className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#D4A017] flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">Manage Results</p>
                <p className="text-xs text-gray-500">Add or edit term results</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Results</h2>
          {recentResults.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">No results recorded yet</p>
          ) : (
            <div className="space-y-3">
              {recentResults.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-sm">{r.student_name}</p>
                    <p className="text-xs text-gray-500">
                      {r.class_level} • {r.term} • {r.academic_year}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1B5E20]">
                      {r.average_score?.toFixed(1) || '—'}
                    </p>
                    <p className="text-xs text-gray-400">Average</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl border p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Class Distribution</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'JHS 1', count: jhs1, color: 'bg-green-500' },
            { name: 'JHS 2', count: jhs2, color: 'bg-amber-500' },
            { name: 'JHS 3', count: jhs3, color: 'bg-orange-700' },
          ].map((c) => (
            <div key={c.name} className="text-center">
              <div className="relative h-2 bg-gray-100 rounded-full mb-2 overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full ${c.color} rounded-full`}
                  style={{
                    width: `${students.length > 0 ? (c.count / students.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-gray-500">{c.count} students</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}