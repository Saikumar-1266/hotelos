import { useState } from 'react'
import menuData from '../data/menuData'

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [
    'All',
    ...new Set(menuData.map((item) => item.category)),
  ]

  const filteredItems =
    selectedCategory === 'All'
      ? menuData
      : menuData.filter((item) => item.category === selectedCategory)

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Page Header */}
      <section className="bg-slate-950 px-6 pb-20 pt-36 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Our Restaurant
        </p>

        <h1 className="mt-4 text-5xl font-bold text-white md:text-6xl">
          Discover Our Menu
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Explore delicious biryanis, Indian breads, curries, breakfast
          favourites and more.
        </p>
      </section>

      {/* Menu */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                selectedCategory === category
                  ? 'bg-slate-950 text-white'
                  : 'bg-white text-slate-600 hover:bg-amber-400 hover:text-slate-950'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Food Cards */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                  {item.category}
                </p>

                <h2 className="mt-3 text-2xl font-bold text-slate-950">
                  {item.name}
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-950">
                    ₹{item.price}
                  </span>

                  <button className="rounded-full bg-amber-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-amber-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>
    </main>
  )
}

export default Menu