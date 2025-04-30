import Modal from 'react-modal';
import { useEffect, useRef, useState } from "react";

export var setTextModal = () => {}

export function ModalComponent({ isOpen, onRequestClose, targetQueryString, tag }) {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const [textmodalInternal, setTextModalInternal] = useState('')
    setTextModal = setTextModalInternal

    useEffect(() => {
        textmodalInternal ? openModal() : closeModal()
    }, [textmodalInternal])

    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement(targetQueryString);

    const title = useRef(null)
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        if (title?.current) {
            console.log(title.current.style)
            title.current.style.color = '#f00';

        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={title}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </div>
    );
}