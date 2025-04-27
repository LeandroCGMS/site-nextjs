"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

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
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
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
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors mt-2"
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
    var formData = new FormData()
    formData.append('id', id)
    formData.append('hash', hash)
    formData.append('password', password)
    formData.append('password_confirm', passwordConfirm)
    var tokengoogle = await generateGoogleToken()
    try {
        var URL = 'https://leandrocgms.online/api-angular/recover-password/'
        response = await fetch(URL, {
            method: 'PATCH', // PATCH aciona o método patch do servidor que realiza a troca da senha baseada nas informações passadas por aqui.
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
        setTextModalRef(`🚀 Enviamos um e-mail para recuperação da sua conta. Leia as instruções dele e acesse o link informado. `)
        setLoadingRef(false)
    } catch (error) {
        var stringErrors = ''
        for (const [key, value] of Object.entries(errors)) {
            stringErrors += `${value}\n`
        }
        console.warn(`\n\n${getNow()}\nErro ao tentar recuperar senha\n${error.stack}\nLista de Erros: \n${stringErrors}`)
        setLoadingRef(false)
        setTextModalRef(`😥 Os seguintes erros foram constatados pelo nosso servidor:\n` ? stringErrors :
            `😥 Ocorreu um erro ao tentar recuperar sua senha. Tente novamente em instantes. Se o erro persistir, contact o suporte.`)
    }
}