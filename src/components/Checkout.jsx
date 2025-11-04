import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

export default function Checkout({ items, onUpdateQty, onRemove, onPlaceOrder, isAuthenticated }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = items.length > 0 ? 19 : 0;
  const total = subtotal + shipping;

  return (
    <section className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold text-white mb-4">Your Cart</h2>
          <div className="space-y-4">
            {items.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">Your cart is empty.</div>
            )}
            {items.map((it) => (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-4"
              >
                <img src={it.image} alt={it.name} className="h-20 w-24 object-cover rounded-xl" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">{it.name}</h3>
                    <span className="text-teal-300">${(it.price * it.qty).toFixed(2)}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQty(it.id, Math.max(1, it.qty - 1))}
                      className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white"
                    >
                      -
                    </button>
                    <span className="min-w-[2ch] text-center text-white/80">{it.qty}</span>
                    <button
                      onClick={() => onUpdateQty(it.id, it.qty + 1)}
                      className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white"
                    >
                      +
                    </button>
                    <button onClick={() => onRemove(it.id)} className="ml-4 text-white/60 hover:text-white text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-white mb-4">Checkout</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            {!isAuthenticated && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-100 p-3 text-sm">
                Tip: sign in to save your details for next time. You can still checkout as guest.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 ring-teal-400" placeholder="Full name" />
              <input className="px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 ring-teal-400" placeholder="Email" />
              <input className="px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 ring-teal-400 sm:col-span-2" placeholder="Address" />
              <div className="grid grid-cols-2 gap-3 sm:col-span-2">
                <input className="px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 ring-teal-400" placeholder="City" />
                <input className="px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 ring-teal-400" placeholder="ZIP" />
              </div>
            </div>
            <div className="h-px bg-white/10" />
            <div className="space-y-2 text-white/80">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold text-white"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button
              onClick={onPlaceOrder}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-white px-5 py-3 font-medium transition"
            >
              <CreditCard size={18} /> Place secure order
            </button>
            <p className="text-xs text-white/50 text-center">Encrypted checkout. We never store card data.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
