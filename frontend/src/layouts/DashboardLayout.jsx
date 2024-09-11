import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/SidebarComponent';
import {HeaderComponent} from '../components/admin/HeaderComponent';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HeaderComponent />

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          { children || <Outlet /> }
        </main>
      </div>
    </div>
  );
};
