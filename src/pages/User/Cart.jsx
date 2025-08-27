// src/pages/User/Cart.jsx
import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, updateQty, removeFromCart, total } = useCart();
  const nav = useNavigate();

  if (!items.length) return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold">Cart खाली है</h2>
      <p className="mt-3"><Link to="/">Products देखने जाएं</Link></p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 rounded">
      <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
      <div className="space-y-3">
        {items.map(it => (
          <div key={it.id} className="flex items-center gap-4 border-b pb-3">
            <img src={it.thumbnail || it.image || '/favicon.svg'} alt={it.title} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-gray-600">₹{it.price}</div>
              <div className="mt-2 flex items-center gap-2">
                <input type="number" min={1} value={it.qty} onChange={(e)=> updateQty(it.id, Math.max(1, Number(e.target.value)))} className="w-20 border rounded p-1" />
                <button onClick={()=> removeFromCart(it.id)} className="text-red-600">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <div className="text-lg">Total: <span className="font-bold">₹{total}</span></div>
        <div className="mt-3 flex justify-end gap-2">
          <Link to="/" className="px-3 py-2 border rounded">Continue Shopping</Link>
          <button onClick={() => nav('/checkout')} className="px-4 py-2 rounded bg-sky-600 text-white">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}