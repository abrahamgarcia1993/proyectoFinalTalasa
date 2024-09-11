
import { DashboardLayout } from '../layouts/DashboardLayout'

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#006064]">Dashboard</h2>
        <p className="text-gray-700">Bienvenido a tu panel de control</p>
      </div>
    </DashboardLayout>
  )
}
