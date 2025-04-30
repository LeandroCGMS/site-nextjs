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
var generateGoogleToken = null

function Form() {
    const [id, setId] = useState("");
    const [hash, setHash] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [token, setToken] = useState(null);
    const handleReCaptcha = async () => {
        if (!executeRecaptcha) {
            console.log('reCAPTCHA não está carregado ainda');
            return;
        }
        return await executeRecaptcha('action'); // 'homepage' é uma action específica, você pode definir a sua
    }
    generateGoogleToken = handleReCaptcha

    useEffect(() => {
        // Chame a função para obter o token quando necessário, por exemplo, ao enviar um formulário.
        // Você pode associar isso a um evento de clique de botão ou outra ação.
    }, [executeRecaptcha]);

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

    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement('body');

    const subtitle = useRef(null);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center" id="divMain">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={subtitle}>Hello</h2>
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
                        placeholder="Ex: 123"
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
                    <label className="block text-sm font-medium text-gray-700 mb-0 mt-4">
                        Nova Senha
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite a nova senha"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-0 mt-4">
                        Confirmação da Nova Senha
                    </label>
                    <input
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        type="password"
                        className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirme a nova senha"
                    />
                </div>

                <button
                    onClick={(event) => {
                        // handleSubmit(event);
                        sendForm(id, hash, password, passwordConfirm)
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
        <GoogleReCaptchaProvider reCaptchaKey="6LfUDVQeAAAAAAfI1-Hf3Sz9ZT56MMr-PDQO5vaG">
            <Form />
        </GoogleReCaptchaProvider>
    )
}

async function sendForm(id, hash, password, passwordConfirm) {
    console.warn(process.env.NODE_ENV)
    var errors = {}
    var response
    NProgress.start()
    console.log(id, hash, password, passwordConfirm)
    var formData = new FormData()
    formData.append('id', id)
    formData.append('hash', hash)
    formData.append('password', password)
    formData.append('password_confirm', passwordConfirm)
    var tokengoogle = await generateGoogleToken()
    var URL
    process.env.NODE_ENV === 'development' ? URL = 'http://localhost/api-angular/recover-password/' :
        URL = 'https://nextjs.leandrocgms.online/api-angular/recover-password/'
    try {
        response = await fetch(URL, {
            method: 'DELETE',
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
        setTextModal(`🚀 Enviamos um e-mail para recuperação da sua conta. Leia as instruções dele e acesse o link informado. `)
        NProgress.done()
    } catch (error) {
        var stringErrors = ''
        for (const [key, value] of Object.entries(errors)) {
            stringErrors += `${value}\n`
        }
        console.warn(`\n\n${getNow()}\nErro ao tentar recuperar senha\n${error.stack}\nLista de Erros: \n${stringErrors}`)
        NProgress.done()
        setTextModal(`😥 Os seguintes erros foram constatados pelo nosso servidor:\n` ? stringErrors :
            `😥 Ocorreu um erro ao tentar recuperar sua senha. Tente novamente em instantes. Se o erro persistir, contact o suporte.`)
    }
}