import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Shield, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { studentService } from '@/services/studentService';

const ADMIN_EMAIL = 'admin@hadash.edu.gh';
const ADMIN_PASSWORD = 'admin123';

export default function SchoolLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [pin, setPin] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const match = await studentService.findByCredentials(studentId, pin);
      if (match) {
        sessionStorage.setItem('hadash_student', JSON.stringify(match));
        navigate('/StudentPortal');
      } else {
        setError('Invalid Student ID or PIN. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError('');

    if (adminEmail === ADMIN_EMAIL && adminPassword === ADMIN_PASSWORD) {
      sessionStorage.setItem('hadash_admin', 'true');
      sessionStorage.setItem(
        'hadash_admin_user',
        JSON.stringify({ full_name: 'School Administrator', email: adminEmail })
      );
      navigate('/Dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#33691E] flex items-center justify-center p-4">
      <div className="fixed top-0 left-0 right-0 kente-border z-50" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-[#D4A017] flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <GraduationCap className="w-11 h-11 text-[#1B5E20]" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Hadash</h1>
          <p className="text-green-200 text-sm mt-1 uppercase tracking-widest">
            Educational School
          </p>
          <p className="text-green-300 text-xs mt-1">Junior High School — Ghana</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="kente-border" />
          <div className="p-8">
            {mode === null && (
              <>
                <h2 className="text-xl font-bold text-gray-800 text-center mb-1">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-500 text-center mb-7">
                  Please select your login type
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => setMode('student')}
                    className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-[#1B5E20] hover:bg-green-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-[#1B5E20] transition-colors">
                      <Users className="w-6 h-6 text-[#1B5E20] group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900">Student Login</p>
                      <p className="text-xs text-gray-500">View your results & timetable</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#1B5E20] transition-colors" />
                  </button>

                  <button
                    onClick={() => setMode('admin')}
                    className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-[#D4A017] hover:bg-amber-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:bg-[#D4A017] transition-colors">
                      <Shield className="w-6 h-6 text-[#D4A017] group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900">Admin Login</p>
                      <p className="text-xs text-gray-500">
                        Manage students, results & timetable
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#D4A017] transition-colors" />
                  </button>
                </div>
              </>
            )}

            {mode === 'student' && (
              <>
                <button
                  onClick={() => {
                    setMode(null);
                    setError('');
                    setStudentId('');
                    setPin('');
                  }}
                  className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1"
                >
                  ← Back
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#1B5E20]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Student Login</h2>
                    <p className="text-xs text-gray-500">Enter your Student ID and PIN</p>
                  </div>
                </div>

                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="sid">Student ID</Label>
                    <Input
                      id="sid"
                      placeholder="e.g. HDS-001"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="mt-1 h-11"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="pin">PIN</Label>
                    <Input
                      id="pin"
                      type="password"
                      placeholder="Enter your PIN"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="mt-1 h-11"
                      required
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] h-11"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Access My Portal'}
                  </Button>
                </form>

                <div className="mt-5 p-3 bg-green-50 rounded-xl text-center">
                  <p className="text-xs text-green-700">
                    <strong>Demo:</strong> ID:{' '}
                    <code className="font-mono bg-white px-1 rounded">HDS-001</code> · PIN:{' '}
                    <code className="font-mono bg-white px-1 rounded">1234</code>
                  </p>
                </div>
              </>
            )}

            {mode === 'admin' && (
              <>
                <button
                  onClick={() => {
                    setMode(null);
                    setError('');
                  }}
                  className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1"
                >
                  ← Back
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#D4A017]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Admin Login</h2>
                    <p className="text-xs text-gray-500">For school staff only</p>
                  </div>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@hadash.edu.gh"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="mt-1 h-11"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="mt-1 h-11"
                      required
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#D4A017] hover:bg-[#b8891b] text-white h-11"
                  >
                    Login as Admin
                  </Button>
                </form>

                <div className="mt-5 p-3 bg-amber-50 rounded-xl text-center">
                  <p className="text-xs text-amber-700">
                    <strong>Demo:</strong>{' '}
                    <code className="font-mono bg-white px-1 rounded">
                      admin@hadash.edu.gh
                    </code>{' '}
                    /{' '}
                    <code className="font-mono bg-white px-1 rounded">admin123</code>
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="px-8 pb-5 text-center">
            <p className="text-xs text-gray-400">© 2025 Hadash Educational School · Ghana</p>
          </div>
        </div>
      </div>
    </div>
  );
}