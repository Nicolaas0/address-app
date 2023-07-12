/* eslint-disable no-restricted-imports */
import { BsTrash } from 'react-icons/bs'

import { useFirestoreDelete } from 'hooks/usePost'
import usePostStore from 'store/usePostStore'

import { PhoneBookEntry } from '../types'



export default function ContactItem({ data }: { data: PhoneBookEntry[] }) {
    const { deleteFirestore } = useFirestoreDelete()
    const { setRefresh, refresh } = usePostStore()

    const deleteHandler = (id: string) => {
        deleteFirestore(id)
        setRefresh(!refresh)
    }

    return (
        <>
            {data.length > 0 ? data?.map((item, index) => {
                return (
                    <div key={index} className='flex justify-between items-center cursor-default'>
                        <div className='w-full flex justify-around items-center'>
                            <div className='text-lg font-semibold min-w-[100px]'>{item.name}</div>
                            <div className='min-w-[200px]'>
                                <div className='text-base '>☎ {item.phone}</div>
                                <div className='text-base '>🏡 {item.address}</div>
                            </div>
                            <div>
                                <div className='text-base '>📧 {item.email}</div>
                                <div className='text-base '>📍 {item.country}</div>
                            </div>
                            <div onClick={()=> deleteHandler(item.id)}>
                                <BsTrash className='cursor-pointer' size={25} color='#f89936' />
                            </div>
                        </div>
                    </div>
                )
            }) : (<div>No data.</div>)}
        </>
    )
}