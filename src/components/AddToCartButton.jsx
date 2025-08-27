// src/components/AddToCartButton.jsx
import React from 'react';
import { useCart } from '../context/CartContext.jsx';

// हिंदी: किसी भी product page पर इस button से product cart में add होगा
export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart(product, 1)}
      className="px-3 py-2 rounded bg-emerald-600 text-white"
    >
      Add to Cart
    </button>
  );
}