// src/pages/User/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useAuthState } from '../../context/AuthContext.jsx';
import { createOrder } from '../../services/orders';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuthState();
  const nav = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  if (!items.length) return <div>Cart खाली है</div>;

  async function placeOrder(e) {
    e.preventDefault();
    if (!user) { alert('Login करें पहले'); return; }
    if (!address) { alert('Address डालें'); return; }
    try {
      setLoading(true);
      const order = {
        userId: user.uid,
        items: items.map(i=>({ id: i.id, title: i.title, price: i.price, qty: i.qty })),
        total,
        address,
        paymentMethod: 'COD',
      };
      const id = await createOrder(order);
      clearCart();
      alert('Order placed: ' + id);
      nav('/');
    } catch (err) { alert('Error: ' + err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded">
      <h2 className="text-lg font-semibold mb-4">Checkout</h2>
      <div className="mb-4">
        <h3 className="font-medium">Order Summary</h3>
        {items.map(it=> (
          <div key={it.id} className="flex justify-between py-2 border-b"> 
            <div>{it.title} x {it.qty}</div>
            <div>₹{(it.price*it.qty)}</div>
          </div>
        ))}
        <div className="text-right font-bold mt-3">Total: ₹{total}</div>
      </div>

      <form onSubmit={placeOrder} className="space-y-3">
        <textarea value={address} onChange={e=>setAddress(e.target.value)} placeholder="Address" className="w-full border p-2 rounded" />
        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 bg-sky-600 text-white rounded">Place Order (COD)</button>
        </div>
      </form>
    </div>
  );
}