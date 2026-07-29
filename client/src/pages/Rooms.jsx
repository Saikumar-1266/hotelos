import { useState } from 'react'
import roomData from '../data/roomData'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

const Rooms = () => {
  const navigate = useNavigate()
  const [selectedRoom, setSelectedRoom] = useState(null)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    checkInTime: '',
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [availabilityMessage, setAvailabilityMessage] = useState('')

  // Check Availability
  const checkAvailability = async () => {
    if (!formData.checkInDate || !formData.checkInTime) {
      setAvailabilityMessage(
        'Please select check-in date and time.'
      )
      return
    }

    setCheckingAvailability(true)
    setAvailabilityMessage('')

    const { data, error } = await supabase.rpc(
      'is_room_available',
      {
        p_room_type: selectedRoom.name,
        p_check_in_date: formData.checkInDate,
        p_check_in_time: formData.checkInTime,
      }
    )

    if (error) {
      console.error('Availability check error:', error)

      setAvailabilityMessage(
        'Could not check availability. Please try again.'
      )
    } else if (data) {
      setAvailabilityMessage(
        '✅ Room is available for this date and time.'
      )
    } else {
      setAvailabilityMessage(
        '❌ Room is not available for the selected date and time.'
      )
    }

    setCheckingAvailability(false)
  }

  // Submit Booking
  const handleBooking = async (event) => {
    event.preventDefault()

    setLoading(true)
    setMessage('')

    // Check availability again before saving
    const {
      data: isAvailable,
      error: availabilityError,
    } = await supabase.rpc('is_room_available', {
      p_room_type: selectedRoom.name,
      p_check_in_date: formData.checkInDate,
      p_check_in_time: formData.checkInTime,
    })

    if (availabilityError) {
      console.error(
        'Availability check error:',
        availabilityError
      )

      setMessage(
        'Could not check room availability. Please try again.'
      )

      setLoading(false)
      return
    }

    if (!isAvailable) {
      setMessage(
        'Sorry, this room is not available for the selected date and time.'
      )

      setLoading(false)
      return
    }

    // Save booking
    const { error } = await supabase
      .from('room_bookings')
      .insert([
        {
          full_name: formData.fullName,
          phone: formData.phone,
          room_type: selectedRoom.name,
          check_in_date: formData.checkInDate,
          check_in_time: formData.checkInTime,
        },
      ])

    if (error) {
      console.error('Booking error:', error)

      setMessage(
        'Something went wrong. Please try again.'
      )
    } else {
      setMessage(
        `Booking request submitted successfully for ${selectedRoom.name}. Our hotel team will confirm your booking soon.`
      )
      setFormData({
        fullName: '',
        phone: '',
        checkInDate: '',
        checkInTime: '',
      })

      setAvailabilityMessage('')
      setTimeout(() => {
        navigate('/')
      }, 5000)
    }

    setLoading(false)
  }

  // Open Booking Modal
  const openBookingForm = (room) => {
    setSelectedRoom(room)
    setMessage('')
    setAvailabilityMessage('')
  }

  // Close Booking Modal
  const closeBookingForm = () => {
    setSelectedRoom(null)
    setMessage('')
    setAvailabilityMessage('')

    setFormData({
      fullName: '',
      phone: '',
      checkInDate: '',
      checkInTime: '',
    })
  }

  return (
    <main className="min-h-screen bg-stone-50">

      {/* Page Header */}
      <section className="bg-slate-950 px-6 pb-16 pt-28 text-center md:pb-20 md:pt-36">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Stay With Us
        </p>

        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          Find Your Perfect Room
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
          Comfortable rooms for a relaxing and convenient
          24-hour stay.
        </p>

      </section>

      {/* Rooms */}
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
                className="h-64 w-full object-cover sm:h-80"
              />

              <div className="p-8">

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-slate-950">
                      {room.name}
                    </h2>

                    <p className="mt-3 text-slate-600">
                      {room.description}
                    </p>

                  </div>

                  <div className="shrink-0">

                    <p className="text-2xl font-bold text-slate-950">
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
                  type="button"
                  onClick={() => openBookingForm(room)}
                  className="mt-8 w-full rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 sm:w-auto"
                >
                  Book This Room
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>

      {/* Booking Modal */}
      {selectedRoom && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-6">

          <div className="relative my-8 w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8">

            {/* Close Button */}
            <button
              type="button"
              onClick={closeBookingForm}
              className="absolute right-6 top-5 text-2xl text-slate-500 hover:text-slate-950"
            >
              ×
            </button>

            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Room Booking
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              {selectedRoom.name}
            </h2>

            <p className="mt-2 text-slate-500">
              ₹{selectedRoom.price} per 24 hours
            </p>

            {/* Booking Form */}
            <form
              onSubmit={handleBooking}
              className="mt-8 space-y-5"
            >

              {/* Full Name */}
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

              {/* Phone Number */}
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

              {/* Check-in Date */}
              <div>

                <label className="mb-2 block text-sm text-slate-600">
                  Check-in Date
                </label>

                <input
                  type="date"
                  required
                  value={formData.checkInDate}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      checkInDate: event.target.value,
                    })

                    setAvailabilityMessage('')
                  }}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />

              </div>

              {/* Check-in Time */}
              <div>

                <label className="mb-2 block text-sm text-slate-600">
                  Check-in Time
                </label>

                <input
                  type="time"
                  required
                  value={formData.checkInTime}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      checkInTime: event.target.value,
                    })

                    setAvailabilityMessage('')
                  }}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />

              </div>

              {/* Check Availability */}
              <button
                type="button"
                onClick={checkAvailability}
                disabled={checkingAvailability}
                className="w-full rounded-full border-2 border-slate-950 py-3 font-semibold text-slate-950 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {checkingAvailability
                  ? 'Checking...'
                  : 'Check Availability'}
              </button>

              {/* Availability Message */}
              {availabilityMessage && (

                <p className="text-center text-sm font-semibold text-slate-700">
                  {availabilityMessage}
                </p>

              )}

              {/* Submit Booking */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-slate-950 py-4 font-semibold text-white transition hover:bg-amber-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? 'Submitting...'
                  : 'Request Booking'}
              </button>

              {/* Booking Message */}
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

export default Rooms