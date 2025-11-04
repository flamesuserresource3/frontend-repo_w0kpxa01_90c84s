import { useState } from 'react';
import { ShoppingCart, Seashell, User, LogOut } from 'lucide-react';

export default function Navbar({ onNav, cartCount, onLoginOpen, isAuthenticated, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const Link = ({ label, page }) => (
    <button
      onClick={() => {
        setMobileOpen(false);
        onNav(page);
      }}
      className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition"
    >
      {label}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Seashell className="text-teal-300" />
            <span className="font-semibold tracking-wide text-white">Azure Shells</span>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <Link label="Home" page="home" />
            <Link label="Products" page="products" />
            <Link label="Customer" page="account" />
          </nav>

          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <button onClick={onLoginOpen} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm transition">
                <User size={18} />
                Sign in
              </button>
            ) : (
              <button onClick={onLogout} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm transition">
                <LogOut size={18} />
                Logout
              </button>
            )}
            <button
              onClick={() => onNav('checkout')}
              className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md bg-teal-500 hover:bg-teal-400 text-white text-sm transition"
              aria-label="View cart and checkout"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-pink-500 text-white rounded-full px-1.5 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 text-white"
              aria-label="Toggle Menu"
            >
              <span className="i">≡</span>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              <Link label="Home" page="home" />
              <Link label="Products" page="products" />
              <Link label="Customer" page="account" />
              {!isAuthenticated ? (
                <button onClick={onLoginOpen} className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition text-left">
                  Sign in
                </button>
              ) : (
                <button onClick={onLogout} className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition text-left">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
