import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-[#FFF8E1] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-24 h-24 rounded-3xl bg-[#1B5E20] flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🎓</span>
        </div>
        <h1 className="text-6xl font-bold text-[#1B5E20] mb-4">404</h1>
        <p className="text-xl text-[#5D4037] mb-8">Page not found</p>
        <Link
          to="/SchoolLogin"
          className="inline-flex items-center gap-2 bg-[#1B5E20] text-white px-6 py-3 rounded-xl hover:bg-[#2E7D32] transition-colors font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}