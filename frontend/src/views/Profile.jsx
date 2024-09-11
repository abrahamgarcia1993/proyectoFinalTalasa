import React from 'react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import useAuthStore from '../store/useAuthStore'

export const Profile = () => {

    const { user } = useAuthStore();

  return (
    <DashboardLayout>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#006064]">Perfil de Usuario</h2>
            <p className="text-gray-700">Bienvenido a tu perfil de usuario: { user.username }</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold text-[#006064]">Datos de Usuario</h2>
            <p className="text-gray-700">Nombre: { user.username }</p>
            <p className="text-gray-700">Email: { user.email }</p>
            <p className="text-gray-700">Rol: { user.role }</p>
        </div>

    </DashboardLayout>
  )
}
