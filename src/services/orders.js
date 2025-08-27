// src/services/orders.js
// हिंदी: Orders collection helper

import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ordersCol = collection(db, 'orders');

export async function createOrder(order) {
  // order: { userId, items, total, address, paymentMethod }
  const docRef = await addDoc(ordersCol, { ...order, createdAt: serverTimestamp(), status: 'pending' });
  return docRef.id;
}