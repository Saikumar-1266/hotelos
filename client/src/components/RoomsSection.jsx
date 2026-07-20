import roomData from '../data/roomData'
import { Link } from 'react-router-dom'

const RoomsSection = () => {
  return (
    <section id="rooms" className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Stay With Us
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-950 md:text-5xl">
            Comfort designed for your stay.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Choose from comfortable rooms designed for a convenient and
            relaxing 24-hour stay.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {roomData.map((room) => (
            <article
              key={room.id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <div className="h-80 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-950">
                      {room.name}
                    </h3>

                    <p className="mt-3 max-w-md leading-7 text-slate-600">
                      {room.description}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <span className="text-2xl font-bold text-slate-950">
                      ₹{room.price}
                    </span>
                    <p className="text-sm text-slate-500">per 24 hours</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-stone-100 px-4 py-2 text-sm text-slate-600"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  to="/rooms"
                  className="mt-8 inline-block rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
                >
                  Check Availability
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default RoomsSection