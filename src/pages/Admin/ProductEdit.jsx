// src/pages/Admin/ProductEdit.jsx
import React, { useEffect, useState } from 'react';
import { getProduct, updateProduct } from '../../services/products';
import { uploadFile } from '../../services/storage';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);

  useEffect(()=>{(async()=>{
    const p = await getProduct(id);
    if (!p) { alert('Product not found'); nav('/admin/products'); return; }
    setTitle(p.title); setPrice(p.price); setDesc(p.description || ''); setLoading(false);
  })();}, [id]);

  async function onSubmit(e){
    e.preventDefault();
    try{
      setLoading(true);
      let update = { title, price: Number(price), description: desc };
      if (file) {
        const res = await uploadFile(file, 'products');
        update.thumbnail = res.url;
      }
      await updateProduct(id, update);
      alert('Updated'); nav('/admin/products');
    }catch(e){ alert(e.message); }finally{ setLoading(false); }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded">
      <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded" required />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" type="number" className="w-full border p-2 rounded" required />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}