// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await loadUserData(firebaseUser.uid);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function loadUserData(uid) {
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setUserData(snap.data());
    }
  }

  async function register(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    const ref = doc(db, 'users', cred.user.uid);
    const newUserData = {
      displayName,
      email,
      isPaid: false,
      progress: {},
      paymentId: null,
      createdAt: serverTimestamp(),
    };
    await setDoc(ref, newUserData);
    setUserData(newUserData);
    return cred.user;
  }

  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await loadUserData(cred.user.uid);
    return cred.user;
  }

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const ref = doc(db, 'users', cred.user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const newUserData = {
        displayName: cred.user.displayName || cred.user.email.split('@')[0],
        email: cred.user.email,
        isPaid: false,
        progress: {},
        paymentId: null,
        createdAt: serverTimestamp(),
      };
      await setDoc(ref, newUserData);
      setUserData(newUserData);
    } else {
      setUserData(snap.data());
    }
    return cred.user;
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    setUserData(null);
  }

  return { user, userData, setUserData, loading, register, login, logout, googleLogin };
}