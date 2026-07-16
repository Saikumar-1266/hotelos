const Footer = () => {
  return (
    <footer className="bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Hotel<span className="text-amber-400">OS</span>
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              Food • Stay • Celebrate
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <a href="#home" className="hover:text-amber-400">
              Home
            </a>

            <a href="#dining" className="hover:text-amber-400">
              Dining
            </a>

            <a href="#rooms" className="hover:text-amber-400">
              Rooms
            </a>

            <a href="#banquet" className="hover:text-amber-400">
              Banquet
            </a>

            <a href="#contact" className="hover:text-amber-400">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
          © 2026 HotelOS. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer
