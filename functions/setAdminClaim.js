// functions/setAdminClaim.js
// Node script (run locally) to set admin custom claim on a user.
// Usage: node setAdminClaim.js <UID> <true|false>

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = process.argv[2];
const value = process.argv[3] === 'true';

if (!uid) {
  console.error('Usage: node setAdminClaim.js <uid> <true|false>');
  process.exit(1);
}

admin.auth().setCustomUserClaims(uid, { admin: value })
  .then(() => {
    console.log(`Custom claim 'admin: ${value}' set for user ${uid}`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error setting claim:', err);
    process.exit(1);
  });