// src/components/CSVUploader.jsx
// हिंदी: CSV file upload करके rows को parse कर देता है और createProduct call करता है
import React, { useState } from 'react';
import Papa from 'papaparse';
import { createProduct } from '../services/products';

export default function CSVUploader() {
  const [loading, setLoading] = useState(false);

  async function handleFile(file) {
    setLoading(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async function(results) {
        // results.data -> array of objects
        const rows = results.data;
        let success = 0, fail = 0;
        for (const row of rows) {
          try {
            // अपेक्षित CSV columns: title, price, description, imageUrl (optional)
            const payload = {
              title: row.title || row.name || row.product_name,
              price: Number(row.price || row.mrp || 0),
              description: row.description || row.desc || '',
              thumbnail: row.imageUrl || row.image || ''
            };
            await createProduct(payload);
            success++;
          } catch (e) {
            console.error('Row import failed', e, row);
            fail++;
          }
        }
        alert(`Imported. Success: ${success}, Fail: ${fail}`);
        setLoading(false);
      },
      error: function(err) {
        alert('CSV parse error: ' + err.message);
        setLoading(false);
      }
    });
  }

  return (
    <div className="bg-white p-4 rounded">
      <h3 className="font-medium mb-2">CSV से bulk product import</h3>
      <input type="file" accept=".csv" onChange={(e)=> handleFile(e.target.files[0])} />
      <p className="text-sm text-gray-500 mt-2">CSV headers: title, price, description, imageUrl (optional)</p>
      {loading && <div className="mt-2 text-sm">Importing...</div>}
    </div>
  );
}