import { useEffect, useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout"
import useAuthStore from "../store/useAuthStore";

export const CursoDetail = () => {

  const { user, isAuthenticated, token } = useAuthStore();
  const [cursoDetail, setCursoDetail] = useState({});

  const fetchCursoDetail = async()=> {
    try {
      const CourseId = new URLSearchParams(window.location.search).get('id');
      const response = await fetch(`http://localhost:3000/api/courses/courses/${CourseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCursoDetail(data);
    }catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const handleDownloadFile = async (fileId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/courses/files/${fileId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error descargando el archivo');
      }
  
      // Ahora deberías poder acceder a 'Content-Disposition'
      const contentDisposition = response.headers.get('Content-Disposition');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
  
      const filename = contentDisposition 
        ? contentDisposition.split('filename=')[1].replace(/"/g, '') 
        : 'file';
  
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
    } catch (error) {
      console.error("Error descargando el archivo: ", error);
    }
  };
  
  
  useEffect(() => {
    
    if ( isAuthenticated ) {
      fetchCursoDetail();
    }

  }, [ isAuthenticated ])


  return (
    <DashboardLayout>

      <div className="bg-white p-6 rounded-lg shadow-md mt-5">
          <h2 className="text-2xl font-bold text-[#006064]">{cursoDetail.title}</h2>
          <p className="text-gray-700">{cursoDetail.description}</p>
          <p className="text-gray-700">Precio: {cursoDetail.precio}€</p>
          <p className="text-gray-700">Fecha de inicio: { new Date(cursoDetail.createdAt).toLocaleDateString() }</p>
          <p className="text-gray-700">Fecha de finalización: { new Date(cursoDetail.temporalidad).toLocaleDateString() }</p>
      </div>

        {
          cursoDetail && (
            cursoDetail.archivos ? (
              <div className="bg-white p-6 rounded-lg shadow-md mt-5">
                <h2 className="text-2xl font-bold text-[#006064]">Archivos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {
                    cursoDetail.archivos.map(archivo => (
                      <div className="bg-gray-100 p-4 rounded-lg shadow-md card"
                        onClick={() => handleDownloadFile(archivo.id)}
                        key={archivo.id}
                      >
                        <h3 className="text-lg font-bold text-[#006064]">{archivo.name}</h3>
                        <p className="text-gray-700">Tipo: {archivo.type}</p>
                        <p className="text-gray-700">Fecha de creación: { new Date(archivo.createdAt).toLocaleDateString() }</p>
                        <p className="text-gray-700">Fecha de actualización: { new Date(archivo.updatedAt).toLocaleDateString() }</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md mt-5">
                <h2 className="text-2xl font-bold text-[#006064]">Archivos</h2>
                <p className="text-gray-700">No hay archivos asignados para este curso</p>
              </div>
            )
          )
        }
      

    </DashboardLayout>
  )
}
