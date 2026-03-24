import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';

export default function Layout({ children, currentPageName }) {
  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(
    sessionStorage.getItem('hadash_admin_user') || '{"full_name":"Administrator"}'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        currentPage={currentPageName}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        user={user}
      />
      <main className={`transition-all duration-300 ${collapsed ? 'ml-[72px]' : 'ml-64'}`}>
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}