// src/services/products.js
// हिंदी: Products CRUD helpers (Firestore)

import { db } from './firebase';
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore';

const productsCol = collection(db, 'products');

export async function createProduct(data) {
  // data: { title, price, description, thumbnail, image }
  const docRef = await addDoc(productsCol, { ...data, createdAt: new Date() });
  return docRef.id;
}

export async function updateProduct(id, data) {
  const d = doc(db, 'products', id);
  await updateDoc(d, data);
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, 'products', id));
}

export async function getProduct(id) {
  const snap = await getDoc(doc(db, 'products', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function listProducts(limitCount = 50) {
  const q = query(productsCol, orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}