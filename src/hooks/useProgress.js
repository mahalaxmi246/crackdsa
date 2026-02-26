// src/hooks/useProgress.js
import { useState, useCallback, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function useProgress(uid, initialProgress) {
  const [progress, setProgress] = useState(initialProgress || {});
  const saveTimer = useRef(null);
  const [saving, setSaving] = useState(false);

  // sync when initialProgress loads from Firebase
  const syncProgress = useCallback((p) => {
    setProgress(p || {});
  }, []);

  const debounceSave = useCallback((newProg) => {
    if (!uid) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaving(true);
    saveTimer.current = setTimeout(async () => {
      try {
        const ref = doc(db, 'users', uid);
        await updateDoc(ref, { progress: newProg });
      } catch (e) {
        console.error('Save error', e);
      }
      setSaving(false);
    }, 700);
  }, [uid]);

  const toggleTask = useCallback((key) => {
    setProgress(prev => {
      const next = { ...prev, [key]: !prev[key] };
      debounceSave(next);
      return next;
    });
  }, [debounceSave]);

  const resetProgress = useCallback(async () => {
    const fresh = {};
    setProgress(fresh);
    if (uid) {
      const ref = doc(db, 'users', uid);
      await updateDoc(ref, { progress: fresh });
    }
  }, [uid]);

  return { progress, toggleTask, resetProgress, syncProgress, saving };
}
