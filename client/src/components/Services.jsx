const services = [
  {
    number: '01',
    title: 'Tea & Tiffins',
    description:
      'Start your day with fresh tea, coffee, and a delicious selection of traditional breakfast favourites.',
    action: 'Explore Tiffins',
  },
  {
    number: '02',
    title: 'Restaurant',
    description:
      'Enjoy flavourful biryanis, curries, naans, starters, and family dining prepared with care.',
    action: 'View Menu',
  },
  {
    number: '03',
    title: 'Rooms',
    description:
      'Relax in clean and comfortable rooms designed for a convenient and peaceful 24-hour stay.',
    action: 'View Rooms',
  },
  {
    number: '04',
    title: 'Banquet Hall',
    description:
      'Celebrate weddings, birthdays, and special occasions in a spacious venue for up to 200 guests.',
    action: 'Explore Banquet',
  },
]

const Services = () => {
  return (
    <section className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Everything Under One Roof
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            More than just a place to stay.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            From your morning breakfast to memorable celebrations, discover
            services designed around your comfort and convenience.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.number}
              className="group flex min-h-80 flex-col bg-white p-8 transition hover:bg-slate-950"
            >
              <span className="text-sm font-semibold text-amber-600">
                {service.number}
              </span>

              <h3 className="mt-12 text-2xl font-bold text-slate-950 transition group-hover:text-white">
                {service.title}
              </h3>

              <p className="mt-4 flex-1 leading-7 text-slate-600 transition group-hover:text-slate-300">
                {service.description}
              </p>

              <button className="mt-8 text-left text-sm font-semibold text-amber-600">
                {service.action} →
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services