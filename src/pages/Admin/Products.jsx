// src/pages/Admin/Products.jsx
import React, { useEffect, useState } from 'react';
import { listProducts, deleteProduct } from '../../services/products';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await listProducts(100);
        setItems(res);
      } catch (e) {
        console.error(e);
        alert('Products load error: ' + e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onDelete(id) {
    if (!confirm('Are you sure to delete this product?')) return;
    try {
      await deleteProduct(id);
      setItems(prev => prev.filter(i => i.id !== id));
      alert('Deleted');
    } catch (e) {
      alert('Delete failed: ' + e.message);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Products (Admin)</h2>
        <div className="flex gap-2">
          <button onClick={()=> nav('/admin/product/create')} className="px-3 py-2 bg-emerald-600 text-white rounded">Add Product</button>
          <Link to="/" className="px-3 py-2 border rounded">View Store</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(it => (
          <div key={it.id} className="border p-3 rounded flex gap-3 items-start">
            <img src={it.thumbnail || '/favicon.svg'} alt={it.title} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-gray-600">₹{it.price}</div>
              <p className="text-sm mt-2 line-clamp-2">{it.description}</p>
              <div className="mt-3 flex gap-2">
                <Link to={`/admin/product/edit/${it.id}`} className="px-2 py-1 border rounded">Edit</Link>
                <button onClick={()=> onDelete(it.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}