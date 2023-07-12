/* eslint-disable import/order */
/* eslint-disable no-restricted-imports */
import { Menu, MenuHeader, MenuItem } from '@szhsin/react-menu';
import Image from 'next/image'
import { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { HiPlus } from 'react-icons/hi'

import AddModal from 'components/navbar/addPopup';
import LoginModal from 'components/navbar/loginModal';
import RegisterModal from 'components/navbar/registerModal';
import { useLogout } from 'hooks/useAuth';

import logo from '../../../public/logo.png'
import useAuthStore from '../../../store/useAuthStore'
import Input from '../input/input'

import 'reactjs-popup/dist/index.css';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import usePostStore from 'store/usePostStore';

export default function Navbar() {
    const [addPopup, setAddPopup] = useState<boolean>(false)
    const [loginPopup, setLoginPopup] = useState<boolean>(false)
    const [registerPopup, setRegisterPopup] = useState<boolean>(false)
    const { user } = useAuthStore();

    const [userCredential, error, logoutHandler] = useLogout();
    const { setSearch } = usePostStore()

    const logout = () => {
        logoutHandler()
    }

    const searchHandler = (value: string) => {
        setSearch(value)
    }

    return (
        <>
            <div className="flex justify-between w-full max-w-[100vw] items-center gap-4 py-2 px-4 lg:px-8">
                <Image className='cursor-pointer' src={logo} alt='Logo' width={50} height={25} />
                <div className='w-1/2'>
                    {user && (<Input search placeholder='Search' onChange={(value) => searchHandler(value)} />)}
                </div>
                <div className='md:flex gap-6 hidden items-center'>
                    {user && (<div onClick={() => { setAddPopup(!addPopup) }} className="flex gap-1 items-center cursor-pointer ">
                        <HiPlus color='#a778d6' />
                        <div className='font-semibold text-[#f89936]'>Add</div>
                    </div>)}
                    {user ?
                        (<Menu direction='left' gap={12} menuButton={<BiUserCircle size={35} className="cursor-pointer" color='#a778d6' />} transition>
                            <MenuHeader>{user.email}</MenuHeader>
                            <MenuItem onClick={logout}><FiLogOut /> Logout</MenuItem>
                        </Menu>)
                        : (<>
                            <div onClick={() => { setLoginPopup(!loginPopup) }} className='cursor-pointer text-[#a778d6] font-semibold'>Login</div>
                            <div onClick={() => { setRegisterPopup(!registerPopup) }} className='font-semibold p-2 border-2 border-[#f89936] border-solid rounded-xl cursor-pointer text-[#f89936]'>Register</div>
                        </>)}
                </div>
                <HiPlus color='#a778d6' className='md:hidden' />
            </div>
            <AddModal popupHandler={() => { setAddPopup(!addPopup) }} popupState={addPopup} />
            <LoginModal popupHandler={() => { setLoginPopup(!loginPopup) }} popupState={loginPopup} />
            <RegisterModal popupHandler={() => { setRegisterPopup(!registerPopup) }} popupState={registerPopup} />
        </>
    )
}