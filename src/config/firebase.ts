import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA77gW0SquDX-iS2voNabQdPgdI254F2og",
  authDomain: "kaspa-app.firebaseapp.com",
  projectId: "kaspa-app",
  storageBucket: "kaspa-app.firebasestorage.app",
  messagingSenderId: "942572066289",
  appId: "1:942572066289:web:fe239bb3b7ec5517fca050",
  measurementId: "G-F3PD9XD867"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.log('The current browser doesn\'t support all of the features required to enable persistence');
  }
});

// Initialize Analytics only if supported
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);