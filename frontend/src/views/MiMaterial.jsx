import React from 'react'
import { DashboardLayout } from '../layouts/DashboardLayout'

export const MiMaterial = () => {
  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#006064]">Mi Material</h2>
        {/* Lista de material */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Material Card */}
          <div className="bg-white p-4 shadow-lg rounded-lg hover:bg-gray-50">
            <h3 className="text-lg font-semibold text-[#006064]">Material 1</h3>
            <p className="text-gray-600 mt-2">Descripción del material 1.</p>
          </div>
          {/* Añadir más material... */}
        </div>
      </div>
    </DashboardLayout>
  )
}
