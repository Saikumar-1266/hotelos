import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import menuData from "../data/menuData";

const FeaturedMenu = () => {
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <section id="dining" className="bg-slate-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Taste The Difference
            </p>

            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Popular from our kitchen.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Discover some of our guests&apos; favourite dishes, prepared fresh
              with quality ingredients and authentic flavours.
            </p>
          </div>

          <Link
            to="/menu"
            className="w-fit rounded-full border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-amber-400 hover:text-amber-400"
          >
            View Full Menu
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {menuData.map((item) => {
            const cartItem = cartItems.find(
              (cart) => cart.id === item.id
            );

            return (
              <article
                key={item.id}
                className="group overflow-hidden rounded-3xl bg-slate-900"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                    {item.category}
                  </p>

                  <h3 className="mt-3 text-xl font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xl font-bold text-white">
                      ₹{item.price}
                    </span>

                    {!cartItem ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                      >
                        Add +
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 rounded-full bg-amber-400 px-3 py-2">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="text-lg font-bold"
                        >
                          −
                        </button>

                        <span className="font-semibold">
                          {cartItem.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="text-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturedMenu;