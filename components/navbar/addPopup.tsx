/* eslint-disable unicorn/filename-case */
/* eslint-disable no-restricted-imports */
import { useState } from "react"

import Button from "components/base/button"
// import FileInput from "components/base/file"
import Input from "components/base/input/input"
import Modal from "components/base/modal"
import TextArea from "components/base/textarea"
import { PostData, useFirestorePost } from "hooks/usePost"

import usePostStore from '../../store/usePostStore'

interface Props {
    submit?: () => void
    popupState: boolean
    popupHandler: () => void
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.trunc(Math.random() * 16),
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default function AddModal({ popupState, popupHandler }: Props) {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const [form, setForm] = useState<PostData>({
        id: '',
        name: '',
        phone: '',
        address: '',
        email: '',
        country: ''
    });
    const { postToFirestore } = useFirestorePost()
    const { setRefresh, refresh } = usePostStore()

    const handleInputChange = (fieldName: string, value: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            [fieldName]: value,
        }));
    };

    const submitHandler = async () => {
        form.id = generateUUID()
        postToFirestore(form)
        popupHandler()
        setRefresh(!refresh)
    }

    return (
        <Modal popupState={popupState} popupHandler={popupHandler}>
            <div className=''>
                <div className='font-semibold text-center text-xl mb-5'>Add Contact</div>
                <div className='space-y-4 flex flex-col justify-center items-center'>
                    <Input label='Name' placeholder='Enter name' onChange={(value) => handleInputChange('name', value)} />
                    <Input label='Phone Number' placeholder='Enter phone number' onChange={(value) => handleInputChange('phone', value)} />
                    <Input label='Email' placeholder='Enter email' onChange={(value) => handleInputChange('email', value)} />
                    <Input label='Country' placeholder='Enter country' onChange={(value) => handleInputChange('country', value)} />
                    <TextArea label="Address" placeholder="Enter address" onChange={(value) => handleInputChange('address', value)} />
                    <Button title="Submit" onClick={submitHandler} />
                    {/* <FileInput onFileSelect={onChangeHandler} /> */}
                </div>
            </div>
        </Modal>
    )
} 