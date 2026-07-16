import banquetImage from '../assets/banquet-hall.png.png'

const BanquetSection = () => {
  return (
    <section id="banquet" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid overflow-hidden rounded-3xl bg-slate-950 lg:grid-cols-2">
          
          <div className="min-h-96">
            <img
              src={banquetImage}
              alt="Banquet hall"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center p-10 md:p-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                Celebrate With Us
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
                A beautiful space for your special moments.
              </h2>

              <p className="mt-6 leading-8 text-slate-300">
                Host weddings, birthdays, family celebrations, corporate
                events, and special occasions in our spacious banquet hall.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6 border-y border-white/10 py-6">
                <div>
                  <p className="text-3xl font-bold text-amber-400">200</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Guest Capacity
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-amber-400">
                    Flexible
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Event Packages
                  </p>
                </div>
              </div>

              <button className="mt-8 rounded-full bg-amber-400 px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-amber-300">
                Check Hall Availability
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BanquetSection