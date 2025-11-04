import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';

const PRODUCTS = [
  {
    id: 'conch-aurora',
    name: 'Aurora Conch',
    price: 320,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=1400&auto=format&fit=crop',
    description:
      'A radiant conch with subtle pink gradients reminiscent of dawn light. Hand-polished, museum-grade specimen.',
  },
  {
    id: 'nautilus-pearl',
    name: 'Pearled Nautilus',
    price: 540,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1650978688025-c48862fde84a?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjIyNzc1NjZ8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    description:
      'Pristine nautilus shell with natural pearlescent sheen. Sustainably collected and certified.',
  },
  {
    id: 'scallop-royale',
    name: 'Scallop Royale',
    price: 210,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1644984875408-36acd5fc4e3d?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjIyNzc1Njh8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    description:
      'Elegant scallop shell with crisp ridges and warm amber tones. Perfect for display cases.',
  },
  {
    id: 'turban-emerald',
    name: 'Emerald Turban',
    price: 260,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1601221612050-a7acdc1c7b20?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxFbWVyYWxkJTIwVHVyYmFufGVufDB8MHx8fDE3NjIyNzc1NzB8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    description:
      'Distinctive spiral with emerald hints, formed over decades by gentle tides. Expertly preserved.',
  },
];

export default function Catalog({ onSelect, onAddToCart }) {
  return (
    <section className="relative py-16" id="catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">Signature Collection</h2>
            <p className="text-white/60">Rare, ethically sourced shells for discerning collectors.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 transition"
            >
              <button onClick={() => onSelect(p)} className="w-full text-left">
                <div className="relative">
                  <img src={p.image} alt={p.name} className="h-56 w-full object-cover" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/40 to-transparent transition" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{p.name}</h3>
                    <span className="text-teal-300 font-medium">${p.price}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-amber-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < Math.round(p.rating) ? '' : 'opacity-30'} />
                    ))}
                    <span className="ml-1 text-xs text-white/60">{p.rating.toFixed(1)}</span>
                  </div>
                </div>
              </button>
              <div className="px-4 pb-4">
                <button
                  onClick={() => onAddToCart({ id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 })}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white py-2 transition"
                >
                  <ShoppingBag size={18} /> Add to cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductDetail({ product, onBack, onAddToCart }) {
  if (!product) return null;
  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
              <img src={product.image} alt={product.name} className="w-full h-[420px] object-cover" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="text-white">
            <button onClick={onBack} className="text-sm text-white/60 hover:text-white">← Back to products</button>
            <h2 className="mt-2 text-3xl font-bold">{product.name}</h2>
            <p className="mt-2 text-white/70">{product.description}</p>
            <div className="mt-4 flex items-center gap-2 text-amber-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < 5 ? '' : 'opacity-30'} />
              ))}
              <span className="text-xs text-white/60">Top rated</span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-3xl font-semibold text-teal-300">${product.price}</span>
              <button
                onClick={() => onAddToCart({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 })}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white px-5 py-3 transition"
              >
                <ShoppingBag size={18} /> Add to cart
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
