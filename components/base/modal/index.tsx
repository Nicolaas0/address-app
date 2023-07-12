interface Props {
    children: React.ReactNode
    popupState: boolean
    popupHandler: () => void
}

export default function Modal({ children, popupState, popupHandler }: Props): JSX.Element | null {
    if (!popupState) {
        return null; // Return null if popupState is false
    }
    return (
        popupState && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div onClick={popupHandler} className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white p-6 rounded-lg shadow-xl relative">
                    {children}
                </div>
            </div>
        )
    )
}