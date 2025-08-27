// src/pages/Admin/ProductCreate.jsx
import React, { useState } from 'react';
import { uploadFile } from '../../services/storage';
import { createProduct } from '../../services/products';
import { useNavigate } from 'react-router-dom';

// हिंदी: Admin page से product add करने के लिए यह form use करें
export default function ProductCreate() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let thumbUrl = '';
      if (file) {
        const res = await uploadFile(file, 'products');
        thumbUrl = res.url;
      }
      const id = await createProduct({ title, price: Number(price), description: desc, thumbnail: thumbUrl });
      alert('Product created: ' + id);
      nav('/admin/products');
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded">
      <h2 className="text-lg font-semibold mb-4">नया Product जोड़ें</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded" required />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" type="number" className="w-full border p-2 rounded" required />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded">Create</button>
        </div>
      </form>
    </div>
  );
}