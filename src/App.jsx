import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroScene from './components/HeroScene';
import Catalog, { ProductDetail } from './components/Catalog';
import Checkout from './components/Checkout';

function LoginModal({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-6 text-white shadow-2xl"
      >
        <h3 className="text-lg font-semibold">Sign in</h3>
        <p className="text-sm text-white/60">Simple session only for demo — no database.</p>
        <div className="mt-4 space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 ring-teal-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 ring-teal-400"
          />
          <button
            onClick={() => {
              if (email && password) {
                onSuccess({ email });
                onClose();
              }
            }}
            className="w-full rounded-lg bg-teal-500 hover:bg-teal-400 text-white py-2 font-medium transition"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'products' | 'product' | 'account' | 'checkout'
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + item.qty } : p));
      }
      return [...prev, item];
    });
  };

  const content = useMemo(() => {
    if (page === 'products') {
      return (
        <Catalog
          onSelect={(p) => {
            setSelected(p);
            setPage('product');
          }}
          onAddToCart={addToCart}
        />
      );
    }
    if (page === 'product') {
      return (
        <ProductDetail
          product={selected}
          onBack={() => setPage('products')}
          onAddToCart={addToCart}
        />
      );
    }
    if (page === 'checkout') {
      return (
        <Checkout
          items={cart}
          onUpdateQty={(id, qty) => setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)))}
          onRemove={(id) => setCart((prev) => prev.filter((p) => p.id !== id))}
          onPlaceOrder={() => {
            alert('Thank you! Your order has been placed.');
            setCart([]);
            setPage('home');
          }}
          isAuthenticated={isAuthenticated}
        />
      );
    }
    if (page === 'account') {
      return (
        <section className="relative py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 text-white">
              <h2 className="text-2xl font-semibold">Customer</h2>
              {!isAuthenticated ? (
                <div className="mt-4">
                  <p className="text-white/70 mb-4">Sign in to view your profile and quick checkout.</p>
                  <button onClick={() => setLoginOpen(true)} className="rounded-lg bg-teal-500 hover:bg-teal-400 text-white px-4 py-2">Sign in</button>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <p><span className="text-white/60">Email:</span> {user.email}</p>
                  <p className="text-white/60">Member status: Collector</p>
                  <div className="pt-4">
                    <button onClick={() => setUser(null)} className="rounded-lg bg-white/10 hover:bg-white/20 text-white px-4 py-2">Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }
    // home
    return (
      <>
        <HeroScene onShop={() => setPage('products')} />
        <Catalog onSelect={(p) => { setSelected(p); setPage('product'); }} onAddToCart={addToCart} />
      </>
    );
  }, [page, selected, cart, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar
        onNav={(p) => setPage(p)}
        cartCount={cartCount}
        onLoginOpen={() => setLoginOpen(true)}
        isAuthenticated={isAuthenticated}
        onLogout={() => setUser(null)}
      />

      <AnimatePresence mode="wait">
        <motion.main key={page} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
          {content}
        </motion.main>
      </AnimatePresence>

      <footer className="border-t border-white/10 py-10 text-center text-white/60">© {new Date().getFullYear()} Azure Shells. All rights reserved.</footer>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={(u) => setUser(u)} />
    </div>
  );
}
