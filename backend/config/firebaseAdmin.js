// backend/config/firebaseAdmin.js
const admin = require('firebase-admin');

// Load the service account key from an environment variable
// It will be a string, so we need to parse it back into an object.
const serviceAccountString = process.env.FIREBASE_ADMIN_SDK_JSON;

if (!serviceAccountString) {
  console.error('FIREBASE_ADMIN_SDK_JSON environment variable is not set!');
  throw new Error('Firebase Admin SDK key (FIREBASE_ADMIN_SDK_JSON) is missing from environment variables.');
}

try {
  const serviceAccount = JSON.parse(serviceAccountString);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    // You might also need to specify databaseURL if you're using Realtime Database:
    // databaseURL: "https://<YOUR-FIREBASE-PROJECT-ID>.firebaseio.com"
  });
  console.log('Firebase Admin SDK initialized successfully from environment variable.');
} catch (error) {
  console.error('Failed to parse Firebase Admin SDK JSON from environment variable:', error);
  throw new Error('Invalid Firebase Admin SDK JSON format. Check FIREBASE_ADMIN_SDK_JSON env var.');
}

module.exports = admin;