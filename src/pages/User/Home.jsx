// src/pages/User/Home.jsx
// हिंदी: Firestore के 'products' collection से products fetch करके दिखाता है

import { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(20));
        const snap = await getDocs(q);
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>लोड हो रहा है...</div>;

  if (!items.length) {
    return (
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Products अभी add नहीं हुए</h1>
        <p className="text-gray-600">Admin panel में product add करने के बाद यहां दिखेंगे।</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(p => (
        <Link key={p.id} to={`/product/${p.id}`} className="border rounded-lg p-3 bg-white hover:shadow">
          <img src={p.thumbnail || p.image || '/favicon.svg'} alt={p.title} className="w-full h-36 object-cover rounded" />
          <div className="mt-2 font-medium line-clamp-1">{p.title}</div>
          <div className="text-sky-600 font-semibold">₹{p.price}</div>
        </Link>
      ))}
    </div>
  );
}