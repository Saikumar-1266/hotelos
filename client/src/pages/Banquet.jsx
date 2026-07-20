import { useState } from 'react'
import banquetImage from '../assets/banquet-hall.png.png'

const Banquet = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-slate-950 px-6 pb-20 pt-36 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Celebrate With Us
        </p>

        <h1 className="mt-4 text-5xl font-bold text-white md:text-6xl">
          Make Your Event Memorable
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          A spacious banquet hall for weddings, birthdays, family gatherings,
          corporate events and special celebrations.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-2">
          <img
            src={banquetImage}
            alt="Hotel banquet hall"
            className="h-full min-h-96 w-full object-cover"
          />

          <div className="p-10 lg:p-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Our Banquet Hall
            </p>

            <h2 className="mt-4 text-4xl font-bold text-slate-950">
              The perfect space for your celebration.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Plan your special occasion in a comfortable and spacious venue
              designed to accommodate up to 200 guests.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-stone-100 p-5">
                <p className="text-3xl font-bold text-slate-950">200</p>
                <p className="mt-1 text-sm text-slate-500">Guest Capacity</p>
              </div>

              <div className="rounded-2xl bg-stone-100 p-5">
                <p className="text-xl font-bold text-slate-950">Flexible</p>
                <p className="mt-1 text-sm text-slate-500">Event Packages</p>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="mt-8 rounded-full bg-amber-400 px-7 py-3.5 font-semibold text-slate-950 hover:bg-amber-300"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-6">
          <div className="relative my-8 w-full max-w-lg rounded-3xl bg-white p-8">

            <button
              onClick={() => setShowForm(false)}
              className="absolute right-6 top-5 text-2xl text-slate-500"
            >
              ×
            </button>

            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Banquet Enquiry
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Plan Your Event
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

              <select
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              >
                <option value="">Select Event Type</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Engagement</option>
                <option>Corporate Event</option>
                <option>Family Function</option>
                <option>Other</option>
              </select>

              <div>
                <label className="mb-2 block text-sm text-slate-600">
                  Event Date
                </label>

                <input
                  type="date"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <input
                type="number"
                min="1"
                max="200"
                placeholder="Expected Number of Guests"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-slate-950 py-4 font-semibold text-white hover:bg-amber-400 hover:text-slate-950"
              >
                Submit Enquiry
              </button>
            </form>

          </div>
        </div>
      )}
    </main>
  )
}

export default Banquet