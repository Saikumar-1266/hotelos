import { useState } from 'react'
import roomData from '../data/roomData'

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null)

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-slate-950 px-6 pb-20 pt-36 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Stay With Us
        </p>

        <h1 className="mt-4 text-5xl font-bold text-white md:text-6xl">
          Find Your Perfect Room
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
          Comfortable rooms for a relaxing and convenient 24-hour stay.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {roomData.map((room) => (
            <article
              key={room.id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <img
                src={room.image}
                alt={room.name}
                className="h-80 w-full object-cover"
              />

              <div className="p-8">
                <div className="flex justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-950">
                      {room.name}
                    </h2>

                    <p className="mt-3 text-slate-600">
                      {room.description}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <p className="text-2xl font-bold">
                      ₹{room.price}
                    </p>
                    <p className="text-sm text-slate-500">
                      per 24 hours
                    </p>
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

                <button
                  onClick={() => setSelectedRoom(room)}
                  className="mt-8 rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
                >
                  Book This Room
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedRoom && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-8">

            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute right-6 top-5 text-2xl text-slate-500"
            >
              ×
            </button>

            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Room Booking
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              {selectedRoom.name}
            </h2>

            <form className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              />

              <div>
                <label className="mb-2 block text-sm text-slate-600">
                  Check-in Date
                </label>

                <input
                  type="date"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-600">
                  Check-in Time
                </label>

                <input
                  type="time"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-slate-950 py-4 font-semibold text-white hover:bg-amber-400 hover:text-slate-950"
              >
                Request Booking
              </button>
            </form>

          </div>
        </div>
      )}
    </main>
  )
}

export default Rooms