import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calendar,
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
  { name: 'Students', icon: Users, page: 'Students' },
  { name: 'Results', icon: ClipboardList, page: 'Results' },
  { name: 'Timetable', icon: Calendar, page: 'Timetable' },
];

export default function AdminSidebar({ currentPage, collapsed, onToggle, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('hadash_admin');
    sessionStorage.removeItem('hadash_admin_user');
    navigate('/SchoolLogin');
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-[#1B5E20] text-white z-40 transition-all duration-300 flex flex-col',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      <div className="kente-border w-full" />

      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#D4A017] flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-6 h-6 text-[#1B5E20]" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-bold text-base leading-tight">Hadash</h1>
            <p className="text-[10px] text-green-200 uppercase tracking-widest">Admin Panel</p>
          </div>
        )}
      </div>

      {!collapsed && user && (
        <div className="mx-3 mb-2 p-3 bg-white/10 rounded-xl">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#D4A017] flex-shrink-0" />
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate">{user.full_name || 'Admin'}</p>
              <p className="text-[10px] text-green-300">Administrator</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 mt-2 space-y-1">
        {adminLinks.map((link) => {
          const isActive = currentPage === link.page;
          return (
            <Link
              key={link.page}
              to={`/${link.page}`}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-white/20 text-[#F5D060]'
                  : 'text-green-100 hover:bg-white/10 hover:text-white'
              )}
            >
              <link.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-[#F5D060]')} />
              {!collapsed && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-green-100 hover:bg-white/10 hover:text-white transition-all w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full py-2 rounded-xl hover:bg-white/10 transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}