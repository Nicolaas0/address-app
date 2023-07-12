/* eslint-disable unicorn/filename-case */
/* eslint-disable no-restricted-imports */
import { useEffect, useState } from "react"

import Input from "components/base/input/input"
import Modal from "components/base/modal"

import { useLogin } from "../../hooks/useAuth"


interface Props {
    popupState: boolean
    popupHandler: () => void
}

export default function LoginModal({ popupState, popupHandler }: Props) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [userCredential, error, loginHandler] = useLogin();

    const handleInputChange = (fieldName: string, value: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            [fieldName]: value,
        }));
    };

    const submitHandler = async () => {
        loginHandler(form)
    }

    useEffect(() => {
        if (userCredential) {
            popupHandler()
        }
    }, [userCredential]);
    
    return (
        <Modal popupState={popupState} popupHandler={popupHandler}>
            <div className=''>
                <div className='font-semibold text-center text-xl mb-5'>Login</div>
                <div className='space-y-4 flex flex-col justify-center items-center'>
                    <Input label='📧 Email' placeholder='Enter Email' onChange={(value) => handleInputChange('email', value)} />
                    <Input type="password" label='🔑 Password' placeholder='Enter Password' onChange={(value) => handleInputChange('password', value)} />
                    {error && <p>{error}</p>}
                    <button className="border border-solid border-white p-4 rounded-lg bg-[#f89936] text-white font-semibold" onClick={submitHandler}>Submit</button>
                </div>
            </div>
        </Modal>
    )
} 