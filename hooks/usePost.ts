/* eslint-disable unicorn/filename-case */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/filename-case */
/* eslint-disable no-restricted-imports */
/* eslint-disable unicorn/filename-case */
import { collection, doc, deleteDoc, setDoc } from "firebase/firestore";
import { useState } from "react";

import useAuthStore from "store/useAuthStore";
import { db } from "utils/firebase";


export interface PostData {
  id: string
  name: string;
  phone: string;
  address: string;
  email: string;
  country: string
}

export const useFirestorePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const postToFirestore = async (data: PostData) => {
    try {
      setIsLoading(true);
      setError(null);
      if (user) {
        const docRef = doc(collection(db, user.uid), data.id);
        await setDoc(docRef, data);
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      // setError(error.message);
    }
  };

  return { isLoading, error, postToFirestore };
};

export const useFirestoreDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const deleteFirestore = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      if (user) {
        await deleteDoc(doc(db, user.uid, id));
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      // setError(error.message);
    }
  };

  return { isLoading, error, deleteFirestore };
};