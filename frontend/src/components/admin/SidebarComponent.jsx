import { Link,/*  useLocation  */} from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
 /*  const { pathname } = useLocation(); */
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
        <button 
            className="md:hidden p-4 text-white bg-[#006064]" 
            onClick={() => setIsOpen(!isOpen)}>
            Menú
        </button>

        <div className={`bg-[#006064] w-64 min-h-screen text-white fixed z-10 md:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center text-[#4DD0E1]">Dashboard</h2>
        </div>
        <nav className="mt-10">
          <Link to="/dashboard/mis-cursos" className="block py-2.5 px-4 rounded hover:bg-[#4DD0E1]">Mis Cursos</Link>
          <Link to="/dashboard/mis-examenes" className="block py-2.5 px-4 rounded hover:bg-[#4DD0E1]">Mis Exámenes</Link>
          <Link to="/dashboard/mi-material" className="block py-2.5 px-4 rounded hover:bg-[#4DD0E1]">Mi Material</Link>
          <Link to="/" className="block py-2.5 px-4 rounded hover:bg-[#4DD0E1]">Inicio</Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
