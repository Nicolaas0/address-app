/* eslint-disable unicorn/filename-case */
/* eslint-disable no-restricted-imports */
import { useEffect, useState } from "react"

import Button from "components/base/button"
import Input from "components/base/input/input"
import Modal from "components/base/modal"

import { useRegister } from "../../hooks/useAuth"

interface Props {
    popupState: boolean
    popupHandler: () => void
}
export default function RegisterModal({ popupState, popupHandler }: Props) {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [errorRegister, setErrorRegister] = useState<string>()
    const [userCredential, error, registerHandler] = useRegister();

    const handleInputChange = (fieldName: string, value: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            [fieldName]: value,
        }));
    };

    const submitHandler = async () => {
        setErrorRegister('')
        if (form.password !== form.confirmPassword) {
            setErrorRegister('Password must match.')
        }
        registerHandler(form)
    }

    useEffect(() => {
        if (userCredential) {
            popupHandler()
        }
    }, [userCredential]);

    return (
        <Modal popupState={popupState} popupHandler={popupHandler}>
            <div className=''>
                <div className='font-semibold text-center text-xl mb-5'>Add Contact</div>
                <div className='space-y-4 flex flex-col justify-center items-center'>
                    <Input label='Email' placeholder='Enter Email' onChange={(value) => handleInputChange('email', value)} />
                    <Input label='Username' placeholder='Enter username' onChange={(value) => handleInputChange('username', value)} />
                    <Input type="password" label='Password' placeholder='Enter password' onChange={(value) => handleInputChange('password', value)} />
                    <Input type="password" label='Confirm Password' placeholder='Enter confirm password' onChange={(value) => handleInputChange('confirmPassword', value)} />
                    {userCredential && <p>User registered successfully!</p>}
                    {errorRegister && <p>{errorRegister}</p>}
                    {error && <p>{error}</p>}
                    <Button title="Submit" onClick={submitHandler} />
                </div>
            </div>
        </Modal>
    )
}