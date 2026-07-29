import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { supabase } from '../services/supabase'

const Cart = () => {
  const navigate = useNavigate()
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart()

  const [showCheckout, setShowCheckout] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleOrder = async (event) => {
    event.preventDefault()

    setLoading(true)
    setMessage('')

    const orderItems = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }))

    const { error } = await supabase
      .from('food_orders')
      .insert([
        {
          customer_name: customerName,
          phone: phone,
          items: orderItems,
          total_amount: cartTotal,
        },
      ])

    if (error) {
      console.error('Food order error:', error)
      setMessage('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setMessage(
  'Your food order has been placed successfully! Our hotel team will prepare your order shortly.'
)

setLoading(false)

setTimeout(() => {
  clearCart()
  setCustomerName('')
  setPhone('')
  navigate('/')
}, 3000)
  }

  return (
    <main className="min-h-screen bg-stone-50">

      {/* Header */}
      <section className="bg-slate-950 px-6 pb-14 pt-28 text-center md:pb-16 md:pt-36">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Your Order
        </p>

        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
          Shopping Cart
        </h1>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">

        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center">

            <h2 className="text-2xl font-bold text-slate-950">
              Your cart is empty
            </h2>

            <p className="mt-3 text-slate-500">
              Add some delicious food from our menu.
            </p>

            <Link
              to="/menu"
              className="mt-6 inline-block rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950"
            >
              Explore Menu
            </Link>

          </div>
        ) : (
          <>

            {/* Cart Items */}
            <div className="space-y-5">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-3xl bg-white p-4 sm:flex-row sm:items-center sm:p-5"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-full rounded-2xl object-cover sm:w-32"
                  />

                  <div className="flex-1">

                    <h2 className="text-xl font-bold text-slate-950">
                      {item.name}
                    </h2>

                    <p className="mt-1 font-semibold text-amber-600">
                      ₹{item.price}
                    </p>

                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center gap-3 sm:justify-start">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="h-10 w-10 rounded-full bg-stone-100 font-bold"
                    >
                      −
                    </button>

                    <span className="min-w-6 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="h-10 w-10 rounded-full bg-stone-100 font-bold"
                    >
                      +
                    </button>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="text-sm font-semibold text-red-600"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

            {/* Total */}
            <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <span className="text-lg text-slate-300">
                  Order Total
                </span>

                <span className="text-3xl font-bold">
                  ₹{cartTotal}
                </span>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCheckout(true)
                  setMessage('')
                }}
                className="mt-8 w-full rounded-full bg-amber-400 py-4 font-semibold text-slate-950 hover:bg-amber-300"
              >
                Proceed to Checkout
              </button>

            </div>

          </>
        )}

      </section>

      {/* Checkout Popup */}
      {showCheckout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-6">

          <div className="relative my-8 w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8">

            <button
              type="button"
              onClick={() => {
                setShowCheckout(false)
                setMessage('')
              }}
              className="absolute right-6 top-5 text-2xl text-slate-500"
            >
              ×
            </button>

            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Checkout
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Place Your Order
            </h2>

            <p className="mt-3 text-slate-500">
              Order Total:{' '}
              <span className="font-bold text-slate-950">
                ₹{cartTotal}
              </span>
            </p>

            <form
              onSubmit={handleOrder}
              className="mt-8 space-y-5"
            >

              <input
                type="text"
                placeholder="Full Name"
                required
                value={customerName}
                onChange={(event) =>
                  setCustomerName(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              />

              {/* Order Summary */}
              <div className="rounded-2xl bg-stone-100 p-5">

                <p className="font-bold text-slate-950">
                  Order Summary
                </p>

                <div className="mt-3 space-y-2">

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-1 text-sm sm:flex-row sm:justify-between"
                    >

                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        ₹{item.price * item.quantity}
                      </span>

                    </div>
                  ))}

                </div>

                <div className="mt-4 flex justify-between border-t border-slate-300 pt-4 font-bold">

                  <span>Total</span>

                  <span>
                    ₹{cartTotal}
                  </span>

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-slate-950 py-4 font-semibold text-white hover:bg-amber-400 hover:text-slate-950 disabled:opacity-60"
              >
                {loading
                  ? 'Placing Order...'
                  : 'Place Order'}
              </button>

              {message && (
                <p className="text-center font-semibold text-green-600">
                  {message}
                </p>
              )}

            </form>

          </div>

        </div>
      )}

    </main>
  )
}

export default Cart