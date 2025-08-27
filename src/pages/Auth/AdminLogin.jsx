// src/pages/Auth/AdminLogin.jsx
// हिंदी: Quick demo Admin login using an allowlist. Production में custom claims use करें.

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  // Demo allowlist - बदलकर अपनी admin email डालें
  const ADMIN_ALLOWLIST = [
    'aapka-admin-email@example.com'
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      if (!ADMIN_ALLOWLIST.includes(user.email)) {
        await auth.signOut();
        setErr('यह ईमेल admin allowlist में नहीं है।');
        return;
      }
      nav('/admin/products');
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Admin Email" className="w-full border p-2 rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border p-2 rounded" />
        <button className="w-full bg-sky-600 text-white p-2 rounded">Login as Admin</button>
      </form>
      <p className="text-sm text-gray-500 mt-3">नोट: यह तरीका सिर्फ quick demo है — secure approach बाद में देंगे।</p>
    </div>
  );
}