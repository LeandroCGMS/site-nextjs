"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import NProgress from "nprogress";
import { useRouter } from "next/navigation";
import "nprogress/nprogress.css";
import "./page.css";
import Modal from 'react-modal';
import { getNow } from "@/utils/functions";
import { FaEye, FaEyeSlash } from "@/utils/functions"
import GoogleReCaptcha from "@/utils/google-recaptcha";
import { useReCaptcha } from "@/utils/google-recaptcha";

function Form() {
    const { handleReCaptcha } = useReCaptcha();
    const [id, setId] = useState("");
    const [hash, setHash] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [token, setToken] = useState(null);
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

    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement('body');

    const subtitle = useRef(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [textModal, setTextModal] = useState('')
    const [titleModal, setTitleModal] = useState('')

    function setTitleTextModal(title, text) {
        setTitleModal(title)
        setTextModal(text)
        openModal()
    }

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

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);
    const refPassword = useRef(null);
    const refPasswordConfirm = useRef(null);
    const [heighInputPassword, setHeighInputPassword] = useState()
    const [heighInputPasswordConfirm, setHeighInputPasswordConfirm] = useState()

    useEffect(() => {
        if (refPassword?.current) {
            setHeighInputPassword(refPassword?.current?.offsetHeight); // ou .clientHeight
        }
        if (refPasswordConfirm?.current) {
            setHeighInputPasswordConfirm(refPasswordConfirm?.current?.offsetHeight); // ou .clientHeight
        }
    }, []);

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center" id="divMain">
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

            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Redefinir Senha
                </h1>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-0">
                        Id de Usuário
                    </label>
                    <input
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Copie e cole o id no formato UUID4"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-0 mt-4">
                        Hash
                    </label>
                    <input
                        value={hash}
                        onChange={(e) => setHash(e.target.value)}
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Hash recebido por e-mail"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 mt-4">
                        Nova Senha
                    </label>
                    {!visiblePassword ? <FaEye onClick={() => setVisiblePassword(!visiblePassword)} size={30} className="cursor-pointer ml-1"
                        style={{ marginBottom: `-${((heighInputPassword + 30) / 2)}px`, zIndex: 100 }} /> :
                        <FaEyeSlash onClick={() => setVisiblePassword(!visiblePassword)} size={30} className="cursor-pointer ml-1"
                            style={{ marginBottom: `-${((heighInputPassword + 30) / 2)}px`, zIndex: 100 }} />}
                    <input
                        ref={refPassword}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={visiblePassword ? "text" : "password"}
                        className="mt-0 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9 text-center"
                        placeholder="Digite a nova senha"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 mt-4">
                        Confirmação da Nova Senha
                    </label>
                    <div>
                        {!visiblePasswordConfirm ? <FaEye onClick={() => setVisiblePasswordConfirm(!visiblePasswordConfirm)} size={30} className="cursor-pointer ml-1"
                            style={{ marginBottom: `-${((heighInputPasswordConfirm + 30) / 2)}px`, zIndex: 100 }} /> :
                            <FaEyeSlash onClick={() => setVisiblePasswordConfirm(!visiblePasswordConfirm)} size={30} className="cursor-pointer ml-1"
                                style={{ marginBottom: `-${((heighInputPasswordConfirm + 30) / 2)}px`, zIndex: 100 }} />}
                    </div>
                    <input
                        ref={refPasswordConfirm}
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        type={visiblePasswordConfirm ? "text" : "password"}
                        className="mt-0 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9 text-center"
                        placeholder="Confirme a nova senha"
                    />
                </div>

                <button
                    onClick={(event) => {
                        // handleSubmit(event);
                        sendForm(id, hash, password, passwordConfirm, setTitleTextModal, handleReCaptcha) // setTextModal, setIsOpen
                    }}
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors mt-2 cursor-pointer"
                >
                    Alterar Senha
                </button>
            </div>
        </div>
    )
}

export default function RecoverPassword() {
    return (
        <GoogleReCaptcha>
            <Form />
        </GoogleReCaptcha>
    )
}

async function sendForm(id, hash, password, passwordConfirm, setTitleTextModal, handleReCaptcha) { //  setTextModal, setIsOpen
    var errors = {}
    var response
    NProgress.start()
    console.log(id, hash, password, passwordConfirm)
    var formData = new FormData()
    formData.append('id', id)
    formData.append('hash', hash)
    formData.append('password', password)
    formData.append('password_confirm', passwordConfirm)
    var tokengoogle = await handleReCaptcha()
    var URL, json
    process.env.NODE_ENV === 'development' ? URL = 'http://localhost/api-angular/recover-password/' :
        URL = 'https://nextjs.leandrocgms.online/api-angular/recover-password/'
    // URL = 'https://nextjs.leandrocgms.online/api-angular/recover-password/'
    try {
        response = await fetch(URL, {
            method: 'PATCH',
            headers: {
                'tokengoogle': tokengoogle,
                'Accept': 'application/json',
            },
            body: formData
        })
        json = await response.json()
        if (json?.errors) errors = json.errors
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        NProgress.done()
        setTitleTextModal(`😃 Sucesso!`, `Sua senha foi alterada com sucesso.`)
        // setIsOpen(true)
    } catch (error) {
        var stringErrors = ''
        if (errors?.generic?.length > 0) {
            const err = errors.generic
            err.forEach((value) => {
                stringErrors += `<p style="font-family: monospace">${value}</p>`
            })
        }
        console.warn(`\n\n${getNow()}\nErro ao tentar recuperar senha\n${error.stack}\nLista de Erros: \n${stringErrors}`)
        NProgress.done()
        // setIsOpen(true)
        setTitleTextModal(`Erros`, `<p style="font-family: monospace;">😥 Os seguintes erros foram constatados pelo nosso servidor:</p>\n ${stringErrors}`)
    }
}