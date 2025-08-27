// src/pages/Auth/Login.jsx
import { useState } from 'react';
import { useAuthState } from '../../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, loginWithGoogle } = useAuthState();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav('/');
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg border">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      {err && <div className="text-red-600 text-sm mb-2">{err}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="w-full bg-sky-600 text-white rounded p-2">Login</button>
      </form>
      <button onClick={loginWithGoogle} className="w-full mt-3 border rounded p-2">Google से login</button>
      <p className="text-sm mt-3">Naya account? <Link className="text-sky-600" to="/signup">Signup</Link></p>
    </div>
  );
}