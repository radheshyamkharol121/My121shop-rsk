// src/services/storage.js
// हिंदी: Firebase Storage पर file upload helper

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadFile(file, pathPrefix = 'uploads') {
  if (!file) throw new Error('No file provided');
  const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const fullPath = `${pathPrefix}/${filename}`;
  const storageRef = ref(storage, fullPath);
  const snapshot = await uploadBytesResumable(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return { url, path: fullPath };
}