import { useState } from 'react'
import banquetImage from '../assets/banquet-hall.png.png'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

const Banquet = () => {
const navigate = useNavigate()
const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setMessage('')

    const { error } = await supabase
      .from('banquet_enquiries')
      .insert([
        {
          full_name: formData.fullName,
          phone: formData.phone,
          event_type: formData.eventType,
          event_date: formData.eventDate,
          guest_count: Number(formData.guestCount),
        },
      ])

    if (error) {
      console.error('Banquet enquiry error:', error)
      setMessage('Something went wrong. Please try again.')
    } else {
      setMessage(
  'Your banquet enquiry has been submitted successfully. Our hotel team will contact you soon.'
)

      setFormData({
        fullName: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
      })
      setTimeout(() => {
  navigate('/')
}, 3000)
    }

    setLoading(false)
  }

  const openForm = () => {
    setShowForm(true)
    setMessage('')
  }

  const closeForm = () => {
    setShowForm(false)
    setMessage('')
  }

  return (
    <main className="min-h-screen bg-stone-50">

      <section className="bg-slate-950 px-6 pb-16 pt-28 text-center md:pb-20 md:pt-36">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Celebrate With Us
        </p>

        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
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
            className="h-64 w-full object-cover sm:h-80 lg:min-h-96"
          />

          <div className="p-6 sm:p-8 lg:p-14">
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

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-stone-100 p-5">
                <p className="text-3xl font-bold text-slate-950">
                  200
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Guest Capacity
                </p>
              </div>

              <div className="rounded-2xl bg-stone-100 p-5">
                <p className="text-xl font-bold text-slate-950">
                  Flexible
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Event Packages
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openForm}
              className="mt-8 w-full rounded-full bg-amber-400 px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-amber-300 sm:w-auto"
            >
              Enquire Now
            </button>
          </div>

        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-6">

          <div className="relative my-8 w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8">

            <button
              type="button"
              onClick={closeForm}
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

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    fullName: event.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    phone: event.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              />

              <select
                required
                value={formData.eventType}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    eventType: event.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              >
                <option value="">
                  Select Event Type
                </option>

                <option value="Wedding">
                  Wedding
                </option>

                <option value="Birthday">
                  Birthday
                </option>

                <option value="Engagement">
                  Engagement
                </option>

                <option value="Corporate Event">
                  Corporate Event
                </option>

                <option value="Family Function">
                  Family Function
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              <div>
                <label className="mb-2 block text-sm text-slate-600">
                  Event Date
                </label>

                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      eventDate: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <input
                type="number"
                min="1"
                max="200"
                placeholder="Expected Number of Guests"
                required
                value={formData.guestCount}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    guestCount: event.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-slate-950 py-4 font-semibold text-white hover:bg-amber-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </button>

              {message && (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-center">
                  <p className="text-2xl">✅</p>

                  <p className="mt-2 font-semibold text-green-800">
                    {message}
                  </p>
                </div>
              )}

            </form>

          </div>
        </div>
      )}

    </main>
  )
}

export default Banquet