import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

const AdminDashboard = () => {
  const navigate = useNavigate()

  const [roomBookings, setRoomBookings] = useState([])
  const [banquetEnquiries, setBanquetEnquiries] = useState([])
  const [foodOrders, setFoodOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // Dashboard Tab
  const [activeTab, setActiveTab] = useState('rooms')

  // Room Filters
  const [roomSearch, setRoomSearch] = useState('')
  const [roomStatusFilter, setRoomStatusFilter] = useState('all')

  // Banquet Filters
  const [banquetSearch, setBanquetSearch] = useState('')
  const [banquetStatusFilter, setBanquetStatusFilter] = useState('all')

  // Food Filters
  const [foodSearch, setFoodSearch] = useState('')
  const [foodStatusFilter, setFoodStatusFilter] = useState('all')

  // Alert notification
const [notification, setNotification] = useState('')

// Unread notification count
const [unreadCount, setUnreadCount] = useState(0)

const [notifications, setNotifications] = useState([])
const [showNotifications, setShowNotifications] = useState(false)

const [selectedRoomBooking, setSelectedRoomBooking] = useState(null)
const [selectedBanquetEnquiry, setSelectedBanquetEnquiry] = useState(null)
const [selectedFoodOrder, setSelectedFoodOrder] = useState(null)


  const showNotification = (message) => {
  console.log('SHOWING NOTIFICATION:', message)
  setNotification(message)

  setUnreadCount((previousCount) => previousCount + 1)

  

setNotifications((previousNotifications) => [
  {
    id: Date.now(),
    message: message,
    time: new Date().toLocaleTimeString(),
  },
  ...previousNotifications,
])



  // Browser beep
  try {
    const AudioContext =
      window.AudioContext || window.webkitAudioContext

    const audioContext = new AudioContext()

    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(
      800,
      audioContext.currentTime
    )

    gainNode.gain.setValueAtTime(
      0.3,
      audioContext.currentTime
    )

    oscillator.start()

    oscillator.stop(
      audioContext.currentTime + 0.3
    )

    oscillator.onended = () => {
      audioContext.close()
    }
  } catch (error) {
    console.log(
      'Notification sound could not play:',
      error
    )
  }

  // Hide popup after 5 seconds
  setTimeout(() => {
    setNotification('')
  }, 5000)
}

 useEffect(() => {
  checkUserAndLoadData()

  const channel = supabase
    .channel('admin-dashboard-realtime')

    // Room booking changes
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'room_bookings',
      },
      (payload) => {
        console.log('ROOM REALTIME EVENT:', payload)
            
        showNotification('New Room Booking Received')

        fetchData()
      }
    )

    // Banquet enquiry changes
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'banquet_enquiries',
      },
      (payload) => {
        console.log('BANQUET REALTIME EVENT:', payload)
        showNotification('New Banquet Enquiry Received')
        fetchData()
      }
    )

    // Food order changes
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'food_orders',
      },
      (payload) => {
        console.log('FOOD REALTIME EVENT:', payload)
        showNotification('New Food Order Received')
        fetchData()
      }
    )

    .subscribe((status) => {
      console.log('Realtime status:', status)
    })

  return () => {
    console.log('Removing realtime channel')
    supabase.removeChannel(channel)
  }
}, [])

  const checkUserAndLoadData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      navigate('/admin/login')
      return
    }

    await fetchData(true)
  }

  const fetchData = async (showLoader = false) => {
  if (showLoader) {
    setLoading(true)
  }

    const { data: rooms, error: roomsError } = await supabase
      .from('room_bookings')
      .select('*')
      .order('created_at', { ascending: false })

    const { data: banquets, error: banquetsError } = await supabase
      .from('banquet_enquiries')
      .select('*')
      .order('created_at', { ascending: false })

    const { data: foods, error: foodsError } = await supabase
      .from('food_orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (roomsError) {
      console.error('Room bookings error:', roomsError)
    } else {
      setRoomBookings(rooms || [])
    }

    if (banquetsError) {
      console.error('Banquet enquiries error:', banquetsError)
    } else {
      setBanquetEnquiries(banquets || [])
    }

    if (foodsError) {
      console.error('Food orders error:', foodsError)
    } else {
      setFoodOrders(foods || [])
    }

    setLoading(false)
  }

  const updateRoomStatus = async (id, status) => {
    const { error } = await supabase
      .from('room_bookings')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Room status update error:', error)
      alert('Could not update room booking status.')
      return
    }

    await fetchData()
  }

  const updateBanquetStatus = async (id, status) => {
    const { error } = await supabase
      .from('banquet_enquiries')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Banquet status update error:', error)
      alert('Could not update banquet enquiry status.')
      return
    }

    await fetchData()
  }

  const updateFoodStatus = async (id, status) => {
    const { error } = await supabase
      .from('food_orders')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Food order status update error:', error)
      alert('Could not update food order status.')
      return
    }

    await fetchData()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-amber-100 text-amber-700'

    case 'confirmed':
      return 'bg-blue-100 text-blue-700'

    case 'preparing':
      return 'bg-orange-100 text-orange-700'

    case 'ready':
      return 'bg-purple-100 text-purple-700'

    case 'completed':
      return 'bg-green-100 text-green-700'

    case 'cancelled':
      return 'bg-red-100 text-red-700'

    default:
      return 'bg-slate-100 text-slate-700'
  }
}
const getNextFoodStatus = (status) => {
  switch (status) {
    case 'pending':
      return {
        status: 'preparing',
        label: 'Start Preparing',
      }

    case 'preparing':
      return {
        status: 'ready',
        label: 'Mark Ready',
      }

    case 'ready':
      return {
        status: 'completed',
        label: 'Complete Order',
      }

    default:
      return null
  }
}

  // Filter Room Bookings
  const filteredRoomBookings = roomBookings.filter((booking) => {
    const search = roomSearch.toLowerCase().trim()

    const matchesSearch =
      booking.full_name?.toLowerCase().includes(search) ||
      booking.phone?.toString().includes(roomSearch.trim()) ||
      booking.room_type?.toLowerCase().includes(search)

    const matchesStatus =
      roomStatusFilter === 'all' ||
      booking.status === roomStatusFilter

    return matchesSearch && matchesStatus
  })

  // Filter Banquet Enquiries
  const filteredBanquetEnquiries = banquetEnquiries.filter((enquiry) => {
    const search = banquetSearch.toLowerCase().trim()

    const matchesSearch =
      enquiry.full_name?.toLowerCase().includes(search) ||
      enquiry.phone?.toString().includes(banquetSearch.trim()) ||
      enquiry.event_type?.toLowerCase().includes(search)

    const matchesStatus =
      banquetStatusFilter === 'all' ||
      enquiry.status === banquetStatusFilter

    return matchesSearch && matchesStatus
  })

  // Filter Food Orders
  const filteredFoodOrders = foodOrders.filter((order) => {
    const search = foodSearch.toLowerCase().trim()

    const itemsText = Array.isArray(order.items)
      ? order.items
          .map((item) => item.name || '')
          .join(' ')
          .toLowerCase()
      : ''

    const matchesSearch =
      order.customer_name?.toLowerCase().includes(search) ||
      order.phone?.toString().includes(foodSearch.trim()) ||
      itemsText.includes(search)

    const matchesStatus =
      foodStatusFilter === 'all' ||
      order.status === foodStatusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-100">
        <p className="text-xl font-semibold text-slate-700">
          Loading dashboard...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-6 sm:px-6 sm:py-10">
        {/* Room Booking Details Modal */}
{selectedRoomBooking && (
  <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

      {/* Modal Header */}
      <div className="flex items-center justify-between">
        <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
          Room Booking Details
        </h1>

        <button
          type="button"
          onClick={() => setSelectedRoomBooking(null)}
          className="text-2xl font-bold text-slate-500 hover:text-slate-950"
        >
          ×
        </button>
      </div>

      {/* Booking Details */}
      <div className="mt-6 space-y-4">

        <p>
          <span className="font-semibold">Customer:</span>{' '}
          {selectedRoomBooking.full_name}
        </p>

        <p>
          <span className="font-semibold">Phone:</span>{' '}
          {selectedRoomBooking.phone}
        </p>

        <p>
          <span className="font-semibold">Room Type:</span>{' '}
          {selectedRoomBooking.room_type}
        </p>

        <p>
          <span className="font-semibold">Check-in Date:</span>{' '}
          {selectedRoomBooking.check_in_date}
        </p>

        <p>
          <span className="font-semibold">Check-in Time:</span>{' '}
          {selectedRoomBooking.check_in_time}
        </p>
                          <p>
                              <span className="font-semibold">Received At:</span>{' '}
                              {selectedRoomBooking.created_at
                                  ? new Date(selectedRoomBooking.created_at).toLocaleString()
                                  : 'Not available'}
                          </p>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getStatusColor(
              selectedRoomBooking.status || 'pending'
            )}`}
          >
            {selectedRoomBooking.status || 'pending'}
          </span>
        </div>

      </div>

      {/* Close Button */}
      <button
        type="button"
        onClick={() => setSelectedRoomBooking(null)}
        className="mt-8 w-full rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
      >
        Close
      </button>

    </div>
  </div>
)}

{/* Banquet Enquiry Details Modal */}
{selectedBanquetEnquiry && (
  <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-950">
          Banquet Enquiry Details
        </h2>

        <button
          type="button"
          onClick={() => setSelectedBanquetEnquiry(null)}
          className="text-2xl font-bold text-slate-500 hover:text-slate-950"
        >
          ×
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <p>
          <span className="font-semibold">Customer:</span>{' '}
          {selectedBanquetEnquiry.full_name}
        </p>

        <p>
          <span className="font-semibold">Phone:</span>{' '}
          {selectedBanquetEnquiry.phone}
        </p>

        <p>
          <span className="font-semibold">Event Type:</span>{' '}
          {selectedBanquetEnquiry.event_type}
        </p>

        <p>
          <span className="font-semibold">Event Date:</span>{' '}
          {selectedBanquetEnquiry.event_date}
        </p>

        <p>
          <span className="font-semibold">Number of Guests:</span>{' '}
          {selectedBanquetEnquiry.guest_count}
        </p>
                          <p>
                              <span className="font-semibold">Received At:</span>{' '}
                              {selectedBanquetEnquiry.created_at
                                  ? new Date(selectedBanquetEnquiry.created_at).toLocaleString()
                                  : 'Not available'}
                          </p>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getStatusColor(
              selectedBanquetEnquiry.status || 'pending'
            )}`}
          >
            {selectedBanquetEnquiry.status || 'pending'}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSelectedBanquetEnquiry(null)}
        className="mt-8 w-full rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
      >
        Close
      </button>

    </div>
  </div>
)}
        {notification && (
  <div className="fixed right-6 top-6 z-[200] w-full max-w-sm rounded-2xl bg-slate-950 p-5 text-white shadow-2xl">
    <div className="flex w-full flex-wrap items-center justify-end gap-3 sm:w-auto">
      <div className="text-2xl">🔔</div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-amber-400">
          New Notification
        </p>
        <p className="mt-1 font-bold">{notification}</p>
      </div>

      <button
        type="button"
        onClick={() => setNotification('')}
        className="text-xl text-slate-400"
      >
        ×
      </button>
    </div>
  </div>
)}
      {/* Food Order Details Modal */}
{selectedFoodOrder && (
  <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-950">
          Food Order Details
        </h2>

        <button
          type="button"
          onClick={() => setSelectedFoodOrder(null)}
          className="text-2xl font-bold text-slate-500 hover:text-slate-950"
        >
          ×
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <p>
          <span className="font-semibold">Customer:</span>{' '}
          {selectedFoodOrder.customer_name}
        </p>

        <p>
          <span className="font-semibold">Phone:</span>{' '}
          {selectedFoodOrder.phone}
        </p>

        <div>
          <p className="font-semibold">Ordered Items:</p>

          <div className="mt-2 rounded-xl bg-stone-100 p-4">
            {Array.isArray(selectedFoodOrder.items) &&
            selectedFoodOrder.items.length > 0 ? (
              <div className="space-y-2">
                {selectedFoodOrder.items.map((item, index) => (
                  <p key={item.id || index}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No items found.</p>
            )}
          </div>
        </div>

        <p className="text-lg">
          <span className="font-semibold">Total Amount:</span>{' '}
          <span className="font-bold">
            ₹{selectedFoodOrder.total_amount}
          </span>
        </p>
        <p>
  <span className="font-semibold">Received At:</span>{' '}
  {selectedFoodOrder.created_at
    ? new Date(selectedFoodOrder.created_at).toLocaleString()
    : 'Not available'}
        </p>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getStatusColor(
              selectedFoodOrder.status || 'pending'
            )}`}
          >
            {selectedFoodOrder.status || 'pending'}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSelectedFoodOrder(null)}
        className="mt-8 w-full rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
      >
        Close
      </button>

    </div>
  </div>
)}    

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold uppercase tracking-widest text-amber-600">
              HotelOS
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-950">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">

  {/* Notification Bell */}
 <div className="relative inline-block">
  <button
    type="button"
        onClick={() => {
  setShowNotifications((previous) => !previous)
  setUnreadCount(0)
}}  
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm"
    title="Notifications"
  >
    <span className="text-2xl">🔔</span>
  </button>
  {showNotifications && (
  <div className="absolute right-0 top-14 z-[300] w-72 max-w-[90vw] rounded-2xl bg-white p-4 shadow-2xl sm:w-80">
    <h3 className="text-lg font-bold text-slate-950">
      Notifications
    </h3>

    {notifications.length === 0 ? (
      <p className="mt-4 text-sm text-slate-500">
        No notifications yet.
      </p>
    ) : (
      <div className="mt-4 space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-stone-100 p-3"
          >
            <p className="text-sm font-semibold text-slate-900">
              {item.message}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
)}

  {unreadCount > 0 && (
    <div
      style={{
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        backgroundColor: 'red',
        color: 'white',
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 999,
      }}
    >
      {unreadCount > 99 ? '99+' : unreadCount}
    </div>
  )}
</div>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white hover:bg-slate-800"
  >
    Logout
  </button>



</div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button
            type="button"
            onClick={() => setActiveTab('rooms')}
            className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm font-semibold text-slate-500">
              Room Bookings
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-950">
              {roomBookings.length}
            </p>

            <p className="mt-3 text-sm text-amber-600">
              {
                roomBookings.filter(
                  (booking) => booking.status === 'pending'
                ).length
              }{' '}
              pending
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('banquets')}
            className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm font-semibold text-slate-500">
              Banquet Enquiries
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-950">
              {banquetEnquiries.length}
            </p>

            <p className="mt-3 text-sm text-amber-600">
              {
                banquetEnquiries.filter(
                  (enquiry) => enquiry.status === 'pending'
                ).length
              }{' '}
              pending
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('food')}
            className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm font-semibold text-slate-500">
              Food Orders
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-950">
              {foodOrders.length}
            </p>

            <p className="mt-3 text-sm text-amber-600">
              {
                foodOrders.filter(
                  (order) => order.status === 'pending'
                ).length
              }{' '}
              pending
            </p>
          </button>

        </div>

        {/* Navigation Tabs */}
        <div className="mt-10 overflow-x-auto">

          <div className="flex min-w-max gap-2 rounded-2xl bg-white p-2 shadow-sm">

            <button
              type="button"
              onClick={() => setActiveTab('rooms')}
              className={`rounded-xl px-6 py-3 font-semibold transition ${
                activeTab === 'rooms'
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-600 hover:bg-stone-100'
              }`}
            >
              Room Bookings
              <span className="ml-2 rounded-full bg-amber-400 px-2 py-1 text-xs text-slate-950">
                {roomBookings.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('banquets')}
              className={`rounded-xl px-6 py-3 font-semibold transition ${
                activeTab === 'banquets'
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-600 hover:bg-stone-100'
              }`}
            >
              Banquet Enquiries
              <span className="ml-2 rounded-full bg-amber-400 px-2 py-1 text-xs text-slate-950">
                {banquetEnquiries.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('food')}
              className={`rounded-xl px-6 py-3 font-semibold transition ${
                activeTab === 'food'
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-600 hover:bg-stone-100'
              }`}
            >
              Food Orders
              <span className="ml-2 rounded-full bg-amber-400 px-2 py-1 text-xs text-slate-950">
                {foodOrders.length}
              </span>
            </button>

          </div>

        </div>

        {/* ROOM BOOKINGS TAB */}
        {activeTab === 'rooms' && (
          <section className="mt-8 pb-12">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <h2 className="text-2xl font-bold text-slate-950">
                Room Bookings ({filteredRoomBookings.length})
              </h2>

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  placeholder="Search name, phone or room..."
                  value={roomSearch}
                  onChange={(event) =>
                    setRoomSearch(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500 sm:w-auto"
                />

                <select
                  value={roomStatusFilter}
                  onChange={(event) =>
                    setRoomStatusFilter(event.target.value)
                  }
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                              

              </div>

            </div>

            <div className="mt-5 overflow-x-auto rounded-2xl bg-white shadow-sm">

              <table className="w-full min-w-[900px] text-left">

                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Room</th>
                    <th className="p-4">Check-in</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredRoomBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-slate-200"
                    >
                      <td className="p-4">
                        {booking.full_name}
                      </td>

                      <td className="p-4">
                        {booking.phone}
                      </td>

                      <td className="p-4">
                        {booking.room_type}
                      </td>

                      <td className="p-4">
                        {booking.check_in_date}{' '}
                        {booking.check_in_time}
                          </td>

                          <td className="p-4">
                              <span
                                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold capitalize ${getStatusColor(
                                      booking.status || 'pending'
                                  )}`}
                              >
                                  {booking.status || 'pending'}
                              </span>
                          </td>

                      <td className="p-4">

                        <select
                          value={booking.status || 'pending'}
                          onChange={(event) =>
                            updateRoomStatus(
                              booking.id,
                              event.target.value
                            )
                          }
                          className="rounded-lg border border-slate-300 px-3 py-2"
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="confirmed">
                            Confirmed
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>

                          <option value="completed">
                            Completed
                          </option>
                        </select>
                        <button
                                  type="button"
                                  onClick={() => setSelectedRoomBooking(booking)}
                                  className="ml-3 rounded-lg bg-amber-500 px-3 py-2 font-semibold text-slate-950 hover:bg-amber-400"
                              >
                                  View Details
                              </button>

                      </td>
                    </tr>
                  ))}

                  {filteredRoomBookings.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-8 text-center text-slate-500"
                      >
                        No matching room bookings found.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </section>
        )}

        {/* BANQUET TAB */}
        {activeTab === 'banquets' && (
          <section className="mt-8 pb-12">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <h2 className="text-2xl font-bold text-slate-950">
                Banquet Enquiries ({filteredBanquetEnquiries.length})
              </h2>

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  placeholder="Search name, phone or event..."
                  value={banquetSearch}
                  onChange={(event) =>
                    setBanquetSearch(event.target.value)
                  }
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                />

                <select
                  value={banquetStatusFilter}
                  onChange={(event) =>
                    setBanquetStatusFilter(event.target.value)
                  }
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>

              </div>

            </div>

            <div className="mt-5 overflow-x-auto rounded-2xl bg-white shadow-sm">

              <table className="w-full min-w-[900px] text-left">

                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Event</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Guests</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredBanquetEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="border-b border-slate-200"
                    >
                      <td className="p-4">
                        {enquiry.full_name}
                      </td>

                      <td className="p-4">
                        {enquiry.phone}
                      </td>

                      <td className="p-4">
                        {enquiry.event_type}
                      </td>

                      <td className="p-4">
                        {enquiry.event_date}
                      </td>

                      <td className="p-4">
                        {enquiry.guest_count}
                      </td>

                      <td className="p-4">
                              <span
                                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold capitalize ${getStatusColor(
                                      enquiry.status || 'pending'
                                  )}`}
                              >
                                  {enquiry.status || 'pending'}
                              </span>
                          </td>

                      <td className="p-4">

                        <select
                          value={enquiry.status || 'pending'}
                          onChange={(event) =>
                            updateBanquetStatus(
                              enquiry.id,
                              event.target.value
                            )
                          }
                          className="rounded-lg border border-slate-300 px-3 py-2"
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="confirmed">
                            Confirmed
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>

                          <option value="completed">
                            Completed
                          </option>
                        </select>
                              <button
                                  type="button"
                                  onClick={() => setSelectedBanquetEnquiry(enquiry)}
                                  className="ml-3 rounded-lg bg-amber-500 px-3 py-2 font-semibold text-slate-950 hover:bg-amber-400"
                              >
                                  View Details
                              </button>

                      </td>
                    </tr>
                  ))}

                  {filteredBanquetEnquiries.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-8 text-center text-slate-500"
                      >
                        No matching banquet enquiries found.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </section>
        )}

        {/* FOOD ORDERS TAB */}
        {activeTab === 'food' && (
          <section className="mt-8 pb-12">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <h2 className="text-2xl font-bold text-slate-950">
                Food Orders ({filteredFoodOrders.length})
              </h2>

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  placeholder="Search name, phone or food..."
                  value={foodSearch}
                  onChange={(event) =>
                    setFoodSearch(event.target.value)
                  }
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                />

                <select
                  value={foodStatusFilter}
                  onChange={(event) =>
                    setFoodStatusFilter(event.target.value)
                  }
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

              </div>

            </div>

            <div className="mt-5 overflow-x-auto rounded-2xl bg-white shadow-sm">

              <table className="w-full min-w-[1000px] text-left">

                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredFoodOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-200 align-top"
                    >
                      <td className="p-4 font-semibold">
                        {order.customer_name}
                      </td>

                      <td className="p-4">
                        {order.phone}
                      </td>

                      <td className="p-4">

                        {Array.isArray(order.items) &&
                        order.items.length > 0 ? (
                          <div className="space-y-1">

                            {order.items.map((item, index) => (
                              <p
                                key={`${order.id}-${item.id || index}`}
                                className="text-sm"
                              >
                                {item.name} × {item.quantity}
                              </p>
                            ))}

                          </div>
                        ) : (
                          <span className="text-slate-500">
                            No items
                          </span>
                        )}

                      </td>

                      <td className="p-4 font-bold">
                        ₹{order.total_amount}
                      </td>

                      <td className="p-4">
                              <span
                                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold capitalize ${getStatusColor(
                                      order.status || 'pending'
                                  )}`}
                              >
                                  {order.status || 'pending'}
                              </span>
                          </td>

                      <td className="p-4">

                        <select
                          value={order.status || 'pending'}
                          onChange={(event) =>
                            updateFoodStatus(
                              order.id,
                              event.target.value
                            )
                          }
                          className="rounded-lg border border-slate-300 px-3 py-2"
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="preparing">
                            Preparing
                          </option>

                          <option value="ready">
                            Ready
                          </option>

                          <option value="completed">
                            Completed
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>
                        </select>
                              {getNextFoodStatus(order.status || 'pending') && (
                                  <button
                                      type="button"
                                      onClick={() => {
                                          const next = getNextFoodStatus(order.status || 'pending')
                                          updateFoodStatus(order.id, next.status)
                                      }}
                                      className="ml-3 rounded-lg bg-green-600 px-3 py-2 font-semibold text-white hover:bg-green-500"
                                  >
                                      {getNextFoodStatus(order.status || 'pending').label}
                                  </button>
                              )}
                              <button
                                  type="button"
                                  onClick={() => setSelectedFoodOrder(order)}
                                  className="ml-3 rounded-lg bg-amber-500 px-3 py-2 font-semibold text-slate-950 hover:bg-amber-400"
                              >
                                  View Details
                              </button>

                      </td>
                    </tr>
                  ))}

                  {filteredFoodOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-8 text-center text-slate-500"
                      >
                        No matching food orders found.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </section>
        )}

      </div>
    </main>
  )
}

export default AdminDashboard