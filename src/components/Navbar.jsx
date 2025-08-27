// src/components/Navbar.jsx
// हिंदी: साइट का शीर्ष नेविगेशन बार

import { Link } from 'react-router-dom';
import { useAuthState } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuthState();
  const { items } = useCart();

  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-sky-600">my121shop</Link>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="hover:text-sky-600">Cart ({items.length})</Link>
          {user ? (
            <button onClick={logout} className="px-3 py-1 rounded bg-sky-600 text-white">Logout</button>
          ) : (
            <>
              <Link to="/login" className="hover:text-sky-600">Login</Link>
              <Link to="/signup" className="px-3 py-1 rounded bg-sky-600 text-white">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}