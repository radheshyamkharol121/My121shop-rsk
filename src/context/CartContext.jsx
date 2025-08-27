// src/context/CartContext.jsx
// हिंदी: Cart को localStorage में रखता है और add/update/remove helpers देता है

import React, { createContext, useContext, useEffect, useState } from 'react';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('my121_cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem('my121_cart', JSON.stringify(items));
  }, [items]);

  function addToCart(product, qty = 1) {
    setItems(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p);
      }
      return [...prev, { ...product, qty }];
    });
  }

  function updateQty(productId, qty) {
    setItems(prev => prev.map(p => p.id === productId ? { ...p, qty } : p));
  }

  function removeFromCart(productId) {
    setItems(prev => prev.filter(p => p.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);

  return (
    <CartCtx.Provider value={{ items, addToCart, updateQty, removeFromCart, clearCart, total }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}