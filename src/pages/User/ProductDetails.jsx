// src/pages/User/ProductDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AddToCartButton from '../../components/AddToCartButton.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, 'products', id));
      setP(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div>लोड हो रहा है...</div>;
  if (!p) return <div>Product नहीं मिला.</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={p.image || p.thumbnail || '/favicon.svg'} alt={p.title} className="w-full rounded" />
      <div>
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <p className="text-gray-600 mt-2">{p.description}</p>
        <div className="text-2xl text-sky-600 font-bold mt-4">₹{p.price}</div>
        <div className="mt-6">
          <AddToCartButton product={p} />
        </div>
      </div>
    </div>
  );
}