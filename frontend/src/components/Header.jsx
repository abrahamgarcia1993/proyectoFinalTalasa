import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const {  isAuthenticated } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  /* console.log(isAuthenticated) */

  return (
    <header className="md:flex md:justify-end  bg-blue-900">
      <button className="bg-gray-900  w-full md:hidden text-white  text-start pl-10 pt-4" onClick={toggleMenu}>
        =
      </button>

      <nav
        className={`w-[100%] md:h-[60vh] md md:flex flex-col md:flex-row md:justify-between  md:mt-0 md:py-10 md:px-20 text-sm  lg:text-xl text-white bg-gray-900 sm: bg-[rgba(1,1,1,0.7)] ${
          isMenuVisible ? "block" : "hidden"
        }`}>
        <ol className=" md:w-[60%] list-none flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 md:justify-end md:gap-10 ml-10 mb-2">
          <li>
            <Link className="md:text-gray-300" to="/">
            {/* <a className="md:text-gray-300" href="# ">
              Inicio
            </a> */}
            </Link>
          </li>
          <li>
            <a className="md:text-gray-300" href="#curso">
              curso
            </a>
          </li>
          <li>
            <a className="md:text-gray-300" href="#nosotros">
              Sobre Nosotros
            </a>
          </li>
          <li>
            <a className="md:text-gray-300" href="#footer">
              Contacto
            </a>
          </li>
          <li>
            <a className="md:text-gray-300" href="#patrocinadores">
              Patrocinadores
            </a>
          </li>
        </ol>
        {
          isAuthenticated ? (
            <Link className="mb-2 md:mt-0  md:text-gray-300 ml-10" to="/dashboard">
              Dashboard
            </Link>
          ) : (
            <>
              <Link className="mt-2 md:mt-0 md md:text-gray-300" to="/register">
                Registro
              </Link>
              <Link className="mt-2 md:mt-0 md md:text-gray-300" to="/login">
                Iniciar Sesión
              </Link>
            </>
          )
        }
      </nav>
    </header>
  );
};

export default Header;
