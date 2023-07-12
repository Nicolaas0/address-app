/* eslint-disable unicorn/filename-case */
/* eslint-disable no-restricted-imports */
/* eslint-disable unicorn/filename-case */
import { createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState } from 'react';

import { auth } from 'utils/firebase';

export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
  email: string;
  password: string;
}

export function useRegister(): [UserCredential | null, string | null, (payload: RegisterPayload) => void] {
  const [userCredential, setUserCredential] = useState<UserCredential | null>(null);
  const [error, setError] = useState<string | null>(null);

  const registerHandler = ({ email, password }: RegisterPayload) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        setUserCredential(credential);
        setError(null);
      })
      .catch((error) => {
        setUserCredential(null);
        setError(error.message);
      });
  };

  return [userCredential, error, registerHandler];
}

export function useLogin(): [UserCredential | null, string | null, (payload: LoginPayload) => void] {
  const [userCredential, setUserCredential] = useState<UserCredential | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loginHandler = ({ email, password }: LoginPayload) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        setUserCredential(credential);
        setError(null);
      })
      .catch((error) => {
        setUserCredential(null);
        setError(error.message);
      });
  };

  return [userCredential, error, loginHandler];
}

export function useLogout(): [UserCredential | null, string | null, () => void] {
  const [userCredential, setUserCredential] = useState<UserCredential | null>(null);
  const [error, setError] = useState<string | null>(null);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        setUserCredential(null);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return [userCredential, error, logoutHandler];
}