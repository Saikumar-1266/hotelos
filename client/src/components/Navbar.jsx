import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { cartCount } = useCart()

  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">

        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white"
        >
          Hotel<span className="text-amber-400">OS</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-white hover:text-amber-400"
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="text-sm font-medium text-white hover:text-amber-400"
          >
            Dining
          </Link>

          <Link
            to="/rooms"
            className="text-sm font-medium text-white hover:text-amber-400"
          >
            Rooms
          </Link>

          <Link
            to="/banquet"
            className="text-sm font-medium text-white hover:text-amber-400"
          >
            Banquet
          </Link>

          <a
            href="/#contact"
            className="text-sm font-medium text-white hover:text-amber-400"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-5">
          <Link
            to="/cart"
            className="text-sm font-semibold text-white transition hover:text-amber-400"
          >
            Cart ({cartCount})
          </Link>

          <button className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
            Book Now
          </button>
        </div>

      </nav>
    </header>
  )
}

export default Navbar