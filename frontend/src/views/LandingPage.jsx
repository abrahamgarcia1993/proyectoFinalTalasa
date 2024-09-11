import Header from "../components/Header";
import equipo from "../assets/clubTalasa.jpg";
import dMalaga from "../assets/logoDiputacionMalaga.png";
import mCompite from "../assets/MalagaCompite.png";
import Tarjeta from "../components/tarjeta";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [cursosComprados, setCursosComprados] = useState([]);

  const fetchCursos = async () => {
    try {
      const token = localStorage.getItem('token');
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/courses/courses", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCursos(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  

  useEffect(() => {
    fetchCursos();
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div>
      <Header />
      <main className="flex flex-col items-center p-10">
        <section className="flex flex-col w-full" id="nosotros">
          <h2 className="text-center p-6 font-bold text-xl">Talasa Club</h2>
          <article className="flex flex-col xl:flex-row w-full items-center xl:justify-center ">
            <img className="sm:w-[80%] xl:w-[50%] max-h-[480px] p-2" src={equipo} alt="" />
            <div className="sm:w-[80%] xl:w-[40%] md:p-10 flex flex-col items-center gap-4">
              <p>
                ¡Bienvenidos al Club Deportivo Talasa Torremolinos! Somos más que
                un equipo, somos una familia unida por nuestra pasión por el
                salvamento deportivo y la natación...
              </p>
              <Link to="/register" className="text-white bg-[#4DD0E1] p-2 rounded-md">Registrate</Link>
            </div>
          </article>
        </section>
        <section className="py-20" id="patrocinadores">
          <h2 className="text-center font-bold text-xl">Nuestros Patrocinadores</h2>
          <div className="w-full flex flex-col items-center">
            <div className="w-[80%] flex flex-col md:flex-row md:justify-between md:max-h-[400px]">
              <img className="min-w-[240px] md:w-[40%] p-10" src={dMalaga} alt="" />
              <img className="min-w-[240px] md:w-[40%] p-10" src={mCompite} alt="" />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-20 items-center w-full md:w-[90%] p-10" id="curso">
          <h2 className="text-center font-bold text-xl">Nuestro Curso de salvamento</h2>
          <div className="flex flex-col md:flex-row md:flex-wrap w-full md:justify-around items-center">
            {cursos.length > 0 && (
              cursos.map((curso) => (
                <Tarjeta
                  key={`curso-${curso.id}`} // Clave única para cada curso
                  precio={curso.precio}
                  temporalidad={curso.temporalidad}
                  vendido={curso.vendido}
                  ciclo={curso.ciclo}
                  courseId={curso.id}
                  title={curso.title}
                  description={curso.description}
                  cursosComprados={cursosComprados}
                />
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
