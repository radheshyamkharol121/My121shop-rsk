# my121shop — Run instructions (Hindi)

1) .env:
   cp .env.example .env.local
   और Firebase console की values डालो (.env.local में VITE_ prefix के साथ)

2) Install:
   npm install

3) Dev server:
   npm run dev
   फिर browser खोलो: http://localhost:5173

4) Firestore:
   Firebase Console में Firestore enable करो।
   Collection: products — कुछ sample documents add करो (title, price, description, thumbnail)

5) Admin:
   Admin user बनाओ (normal signup) → उसके uid को note करो
   functions/serviceAccountKey.json (service account) रखकर:
     node functions/setAdminClaim.js <UID> true
   इससे user को admin claim मिल जाएगा और वो products create/update/delete कर सकेगा (rules के हिसाब से)

6) Deploy:
   npm run build
   फिर firebase deploy (agar Firebase CLI configured ho)