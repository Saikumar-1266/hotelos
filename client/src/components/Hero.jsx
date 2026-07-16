import heroImage from '../assets/hotel-hero.jpg.png'


const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Hotel restaurant and hospitality"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 lg:px-8">
        <div className="max-w-3xl">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Food • Stay • Celebrate
          </p>

          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            Experience Great Food
            <span className="block text-amber-400">
              & Warm Hospitality
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            From delicious dining and comfortable rooms to memorable
            celebrations, experience everything you need under one roof.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-full bg-amber-400 px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-amber-300">
              Order Food
            </button>

            <button className="rounded-full border border-white/50 px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-slate-950">
              Book Your Stay
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Information */}
      <div className="absolute bottom-8 left-0 z-10 hidden w-full md:block">
        <div className="mx-auto flex max-w-7xl gap-10 px-6 text-sm text-slate-200 lg:px-8">
          <span>Restaurant & Tiffins</span>
          <span>Comfortable Rooms</span>
          <span>Banquet for 200 Guests</span>
          <span>Open Every Day</span>
        </div>
      </div>
    </section>
  )
}

export default Hero