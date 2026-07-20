import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart()

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-slate-950 px-6 pb-16 pt-36 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Your Order
        </p>

        <h1 className="mt-4 text-5xl font-bold text-white">
          Shopping Cart
        </h1>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-950">
              Your cart is empty
            </h2>

            <Link
              to="/menu"
              className="mt-6 inline-block rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-3xl bg-white p-5 sm:flex-row sm:items-center"
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

                    <p className="mt-1 text-amber-600">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="h-10 w-10 rounded-full bg-stone-100 font-bold"
                    >
                      −
                    </button>

                    <span className="min-w-6 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="h-10 w-10 rounded-full bg-stone-100 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm font-semibold text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white">
              <div className="flex items-center justify-between">
                <span className="text-lg text-slate-300">
                  Order Total
                </span>

                <span className="text-3xl font-bold">
                  ₹{cartTotal}
                </span>
              </div>

              <button className="mt-8 w-full rounded-full bg-amber-400 py-4 font-semibold text-slate-950 hover:bg-amber-300">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default Cart