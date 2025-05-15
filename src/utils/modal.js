import Modal from 'react-modal';
import { useEffect, useRef, useState } from "react";

export function ModalGlobal({functionRef}) {

    const customStyles = {
        content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            margin: '4px',
            padding: 0,
            fontWeight: 'bold',
        },
    };

    Modal.setAppElement('body');

    const subtitle = useRef(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [textModal, setTextModal] = useState('')
    const [titleModal, setTitleModal] = useState('')

    function setTitleTextModal(title, text) {
        setTitleModal(title)
        setTextModal(text)
        openModal() // essa linhas é quase certa que deverá ser excluída por redundância, tendo em vista que a função do useEffect escutando textModal já abre o modal
    }

    useEffect(() => {
        if (functionRef) functionRef(setTitleTextModal);
    }, [functionRef]);

    useEffect(() => {
        textModal ? openModal() : closeModal()
    }, [textModal])

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        if (subtitle?.current) subtitle.current.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div>
                <h1 className="w-full bg-blue-500 border border-black text-center text-white">{titleModal}</h1>
                <div className="border-l-1 border-r-1 ml-2 mr-2 mt-2" style={{ padding: '1em' }}>
                    <div dangerouslySetInnerHTML={{ __html: textModal }}></div>
                </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded cursor-pointer mb-2" onClick={closeModal}>Fechar</button>
        </Modal>
    )
}