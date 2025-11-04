import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroScene({ onShop }) {
  return (
    <section className="relative pt-24 overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/9r4Y2YQfZ0vI8T9F/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur px-3 py-1 text-white/90">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              Handpicked from pristine shores
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Luxury Sea Shells
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-indigo-300">for Collectors</span>
            </h1>
            <p className="text-white/70 max-w-xl">
              Discover museum-grade shells curated for elegance. Sustainably sourced, ethically traded, and beautifully presented.
            </p>
            <div className="flex gap-3">
              <button onClick={onShop} className="px-5 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-medium shadow-lg shadow-teal-500/25 transition">
                Shop the Collection
              </button>
              <a href="#about" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition">
                Learn more
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 -left-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1589805719243-774da93c3cb8?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTaGVsbHN8ZW58MHwwfHx8MTc2MjI3NzU2Nnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Shells" className="rounded-2xl object-cover w-full h-72" />
              <div className="mt-4 text-white/80">
                <h3 className="font-semibold">Editors' Choice</h3>
                <p className="text-sm text-white/60">A curated set of rare scallops and conchs.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
