/* eslint-disable import/order */
/* eslint-disable no-restricted-imports */
import useAuthStore from '../../../store/useAuthStore'

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';


import { Layout } from 'types'
import { auth } from 'utils/firebase';

import Navbar from '../../base/navbar'

export const DefaultLayout = ({ children }: Layout) => {
  const store = useAuthStore()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        store.setUser(u)
      } else {
        store.setUser('')
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className='max-w-[100vw] overflow-hidden'>
      <Navbar />
      <div className='px-6 py-2 w-full md:flex md:flex-col md:justify-center md:items-center'>{children}</div>
    </div>
  )
}
