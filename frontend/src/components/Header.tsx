const Header = () => {
  return (
    <header className="flex justify-between px-40 py-4">
        <img src="" alt="" />
        <nav className="p-6">
            <ol className="flex justify-center gap-20">
                <li><a href="">Inicio</a></li>
                <li><a href="">Contacto</a></li>
                <li><a href="">Sobre nosotros</a></li>
                <li><a href="">Promociones</a></li>
                
            </ol>
        </nav>
        <button>Login</button>
    </header>
  )
}

export default Header