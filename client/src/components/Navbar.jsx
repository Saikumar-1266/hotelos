const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        
        <a href="/" className="text-2xl font-bold tracking-wide text-white">
          Hotel<span className="text-amber-400">OS</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#home" className="text-sm font-medium text-white hover:text-amber-400">
            Home
          </a>

          <a href="#dining" className="text-sm font-medium text-white hover:text-amber-400">
            Dining
          </a>

          <a href="#rooms" className="text-sm font-medium text-white hover:text-amber-400">
            Rooms
          </a>

          <a href="#banquet" className="text-sm font-medium text-white hover:text-amber-400">
            Banquet
          </a>

          <a href="#contact" className="text-sm font-medium text-white hover:text-amber-400">
            Contact
          </a>
        </div>

        <button className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
          Book Now
        </button>

      </nav>
    </header>
  )
}

export default Navbar