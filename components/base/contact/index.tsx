/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-imports */
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SlGhost } from 'react-icons/sl'

import useAuthStore from "store/useAuthStore";
import usePostStore from "store/usePostStore";
import { db } from "utils/firebase";

import ContactItem from "./item";
import { PhoneBookEntry } from "./types";
import { sortAndGroupPhoneBook } from "./useContact";

export default function ContactList() {
  const [contactData, setContactData] = useState<Record<string, PhoneBookEntry[]>>({})
  const [loading, setLoading] = useState<boolean>()
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuthStore();
  const { refresh, search } = usePostStore()

  const fetchData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, user.uid));
      const tempArr: DocumentData[] = []
      querySnapshot.forEach((doc) => {
        tempArr.push(doc.data())
      });
      const datas = sortAndGroupPhoneBook(tempArr as PhoneBookEntry[])
      setContactData(datas)
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [refresh, user])

  const searchData = (query) => {
    const filteredData = contactData.filter((data) => {
      // Perform your search logic here, for example:
      return data.name.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(filteredData);
  };

  return (
    <div className="w-full space-y-4 md:max-w-[800px]">
      {loading ? (
        <div className="text-2xl text-[#f89936] font-semibold text-center">Loading...</div>
      ) : Object.keys(contactData).length === 0 ? (
        <div className="space-y-7">
          <div className="text-4xl text-[#f89936] font-semibold text-center"> {user ? 'Create one' : 'Join'} to start!</div>
          <div className="flex justify-center">
            <SlGhost className="mx-auto" size={50} color='#a778d6' />
            <SlGhost className="mx-auto" size={50} color='#a778d6' />
            <SlGhost className="mx-auto" size={50} color='#a778d6' />
          </div>
        </div>
      ) : (
        Object.keys(contactData).map((key) => (
          <div key={key} className="space-y-2">
            <div className="rounded-lg px-2 border-[#f89936] border-2 border-dashed">{key}</div>
            <ContactItem data={contactData[key]} />
          </div>
        ))
      )}
    </div>
  )
}