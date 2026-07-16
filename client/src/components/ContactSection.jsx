const ContactSection = () => {
  return (
    <section id="contact" className="bg-stone-100 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
              Visit Us
            </p>

            <h2 className="mt-4 text-4xl font-bold text-slate-950 md:text-5xl">
              Food, stay and celebrations in one place.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Contact us for restaurant enquiries, room reservations, or
              banquet hall bookings.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-7">
              <p className="text-sm text-slate-500">Call Us</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                +91 XXXXX XXXXX
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7">
              <p className="text-sm text-slate-500">Opening Hours</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                Open Every Day
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 sm:col-span-2">
              <p className="text-sm text-slate-500">Location</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                Hotel address will be added here
              </p>

              <button className="mt-5 font-semibold text-amber-600">
                Get Directions →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactSection