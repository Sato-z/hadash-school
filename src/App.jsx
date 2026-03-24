import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

import SchoolLogin from './pages/SchoolLogin';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Results from './pages/Results';
import Timetable from './pages/Timetable';
import StudentPortal from './pages/StudentPortal';
import PageNotFound from './pages/PageNotFound';
import Layout from './components/layout/Layout';

function AdminRoute({ children, pageName }) {
  const isAdmin = sessionStorage.getItem('hadash_admin') === 'true';
  if (!isAdmin) return <Navigate to="/SchoolLogin" replace />;
  return <Layout currentPageName={pageName}>{children}</Layout>;
}

function StudentRoute({ children }) {
  const student = sessionStorage.getItem('hadash_student');
  if (!student) return <Navigate to="/SchoolLogin" replace />;
  return children;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/SchoolLogin" replace />} />
          <Route path="/SchoolLogin" element={<SchoolLogin />} />
          <Route
            path="/Dashboard"
            element={
              <AdminRoute pageName="Dashboard">
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/Students"
            element={
              <AdminRoute pageName="Students">
                <Students />
              </AdminRoute>
            }
          />
          <Route
            path="/Results"
            element={
              <AdminRoute pageName="Results">
                <Results />
              </AdminRoute>
            }
          />
          <Route
            path="/Timetable"
            element={
              <AdminRoute pageName="Timetable">
                <Timetable />
              </AdminRoute>
            }
          />
          <Route
            path="/StudentPortal"
            element={
              <StudentRoute>
                <StudentPortal />
              </StudentRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}