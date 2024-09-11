
import { useEffect, useState } from 'react';
import tik from '../assets/tik.svg';

const Tarjeta = ({ precio, temporalidad, vendido, ciclo, courseId, title, description, cursosComprados }) => {

  const [isDisabled, setIsDisabled] = useState(true);
  const [loginMessage, setLoginMessage] = useState("");

  const handleBuyCourse = async () => {
    
    window.location.href = `/checkout?courseId=${courseId}`;

    return;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsDisabled(false);
    }else{
      setIsDisabled(true);
      setLoginMessage("Debes iniciar sesión para comprar un curso");
    }
    
  }, [])

  useEffect(() => {
   
    if ( cursosComprados.length > 0) {
      const courseBought = cursosComprados.find((curso) => curso.id === courseId);
      if (courseBought) {
        setIsDisabled(true);
        setLoginMessage("Ya has comprado este curso");
      } else {
        setIsDisabled(false);
      }
    }
    
  }, [])
  
  

  return (
    <div className="border-2 rounded-md border-[#4DD0E1] shadow-sm shadow-[#4DD0E1] p-6 h-[440px] w- md:w-[320px] flex flex-col mb-20 justify-between">
      <div>
        <div className="flex justify-end text-[#4DD0E1] font-bold">
          <p>{title}</p>
        </div>
        <div className="flex justify-end text-[#4DD0E1] font-bold">
          <p>{vendido}</p>
        </div>
        <p className="text-gray-600 font-bold">{description}</p>
        <p className="text-gray-600 font-bold">{temporalidad}</p>
        <div className="flex">
          <p className="text-2xl font-bold">{precio}€</p>
          <span className="mt-[4px] text-gray-500">{ciclo}</span>
        </div>
      </div>
      <ol className="text-gray-500">
        <li className="flex gap-2"><img className="w-4" src={tik} alt="" />Acceso al dashboard</li>
        <li className="flex gap-2"><img className="w-4" src={tik} alt="" />Tutoria personalizada</li>
        <li className="flex gap-2"><img className="w-4" src={tik} alt="" />Acceso al temario</li>
        <li className="flex gap-2"><img className="w-4" src={tik} alt="" />Acceso a piscina</li>
        <li className="flex gap-2"><img className="w-4" src={tik} alt="" />Acceso a Examen</li>
      </ol>
      <button
        className="text-white bg-[#4DD0E1] p-1 rounded-md"
        onClick={handleBuyCourse}
        disabled={isDisabled}
        style={{ backgroundColor: isDisabled ? 'gray' : '#4DD0E1' }}
      >
        {isDisabled ? loginMessage : 'Comprar curso'}
      </button>
    </div>
  );
};

export default Tarjeta;