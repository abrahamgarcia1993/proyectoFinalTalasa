import instagram from '../assets/instagrams.svg'
import facebook from '../assets/facebooks.svg'
import youtube from '../assets/youtubes.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="p-10 bg-gray-900 text-white" id='footer'>
        <div className="md:w-full flex flex-col gap-20 md:flex-row md:justify-around md:p-10">
            <section>
                <h3 className='border-b-2 border-[#4DD0E1] inline-block'>Compañía</h3>
                <ol className='py-6 flex flex-col gap-2'>
                    <li><a href="">Nosotros</a></li>
                    <li><a href="">Nuestro Curso</a></li>
                    <Link to="/privacy">Politicas de privacidad</Link>
                </ol>
            </section>
            <section>
                <h3 className='border-b-2 border-[#4DD0E1] inline-block'>Encuentranos</h3>
                <ol className='py-6 flex flex-col gap-2'>
                    <li>calle cancho perez 13 7e</li>
                    <li>634 78 75 97</li>
                    <li>Talasa@gmail.com</li>
                </ol>
            </section>
            <section>
                <h3 className='border-b-2 border-[#4DD0E1] inline-block'>Siguenos</h3>
                <ol className='flex gap-2 py-6'>
                    <li><img className='w-8  h-8' src={instagram} alt="" /></li>
                    <li><img className='w-8  h-8' src={facebook} alt="" /></li>
                    <li><img className='w-8  h-8' src={youtube} alt="" /></li>
                    
                </ol>
            </section>
        </div>
    </footer>
  )
}

export default Footer