// src/firebase.js
// ─────────────────────────────────────────────────────────────────
// FIREBASE SETUP (takes ~10 minutes):
//
// 1. Go to https://console.firebase.google.com
// 2. Click "Add project" → name it "crackdsa" → Continue
// 3. Disable Google Analytics → Create project
// 4. Click "</>" (Web) icon → Register app as "crackdsa-web"
// 5. Copy the firebaseConfig object and paste it below
// 6. Go to Build → Authentication → Get started
//    → Email/Password → Enable → Save
// 7. Go to Build → Firestore Database → Create database
//    → Start in production mode → Choose asia-south1 (Mumbai)
// 8. Go to Firestore → Rules tab → paste:
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /users/{userId} {
//          allow read, write: if request.auth != null
//                             && request.auth.uid == userId;
//        }
//        match /payments/{docId} {
//          allow read: if request.auth != null;
//          allow write: if false; // only you write via admin
//        }
//      }
//    }
//
// 9. Publish rules
// 10. Replace the values below with your actual config
// ─────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
