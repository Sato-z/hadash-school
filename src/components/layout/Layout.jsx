import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';

export default function Layout({ children, currentPageName }) {
  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(
    sessionStorage.getItem('hadash_admin_user') || '{"full_name":"Administrator"}'
  );

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/hadash-bg.jpg')" }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(212,160,23,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(27,94,32,0.08),transparent_35%)]" />

      <AdminSidebar
        currentPage={currentPageName}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        user={user}
      />

      <main className={`relative transition-all duration-300 ${collapsed ? 'ml-[72px]' : 'ml-64'}`}>
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}