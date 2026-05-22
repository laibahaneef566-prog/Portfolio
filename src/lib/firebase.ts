import { initializeApp, getApps, type FirebaseOptions } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

const firebaseApp = isFirebaseConfigured
  ? getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig)
  : null;

const db = firebaseApp ? getFirestore(firebaseApp) : null;

export async function sendFirebaseMessage({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  if (!db) {
    throw new Error("Firebase is not configured. Add VITE_FIREBASE_* values to your env.");
  }

  return addDoc(collection(db, "support_messages"), {
    name,
    email,
    message,
    created_at: serverTimestamp(),
  });
}
