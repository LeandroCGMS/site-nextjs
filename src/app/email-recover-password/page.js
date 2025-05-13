"use client";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FaKey } from '@/utils/functions';
import { useRouter } from 'next/navigation'; // Importação do useRouter
import { useEffect, useRef, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import GoogleRecaptcha from "@/utils/google-recaptcha";
import { getNow } from "@/utils/functions";
import GoogleReCaptcha from "@/utils/google-recaptcha";
import { useReCaptcha } from "@/utils/google-recaptcha";
import { obj } from "@/utils/google-recaptcha";

const { setTextModal} = obj

function Main() {
    const { handleReCaptcha } = useReCaptcha();
    const router = useRouter(); // Inicializa o hook useRouter
    const [btnAccessHover, setBtnAccessHover] = useState(false)
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState('')
    const [userCpf, setUserCpf] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const styleDefaultBtnAccess = {
        backgroundColor: 'rgb(226, 30, 233)',
        borderWidth: 3,
        borderColor: 'black'
    }
    const styleHoverBtnAccess = {
        backgroundColor: 'rgb(233, 30, 189)',
        borderWidth: 2,
        borderColor: 'black'
    }
    return (
        <div className="flex p-2 w-screen flex-col items-center justify-center h-screen bg-gray-100">
            <p className="w-2/3 text-center">Se você já recebeu um e-mail de recuperação, toque no botão abaixo para ser redirecionado à nossa página de redefinição.</p>
            <button
                onMouseEnter={() => setBtnAccessHover(true)}
                onMouseLeave={() => setBtnAccessHover(false)}
                style={!btnAccessHover ? styleHoverBtnAccess : styleDefaultBtnAccess}
                onClick={() => router.push('/recover-password')} // Redireciona para a URL desejada
                className="w-2/3 flex flex-row p-2 rounded-lg justify-center items-center cursor-pointer text-white"><FaKey size={12} color="white" className="mr-1" />Acessar</button>
            <strong className="mt-4">Você pode recuperar sua senha, se puder se lembrar de, pelo menos, um desses 4 dados a seguir:</strong>
            <div className="w-2/3 mt-4 flex flex-col items-center justify-center">
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    placeholder="Nome de Usuário"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <input
                    onChange={(e) => setUserId(e.target.value)}
                    value={userId}
                    type="text"
                    placeholder="ID do Usuário"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <input
                    onChange={(e) => setUserCpf(e.target.value)}
                    value={userCpf}
                    type="text"
                    placeholder="C.P.F do Usuário"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <input
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    type="text"
                    placeholder="E-mail do Usuário"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <button
                    onClick={() => functionToExecuteToPasswordRecovery(username, userId, userCpf, userEmail, handleReCaptcha)}
                    className="bg-blue-400 p-2 rounded-xl border border-blue-500 border-2 cursor-pointer active:bg-blue-500 active:border-3 active:border-blue-800">Enviar E-mail de Recuperação</button>
            </div>
        </div>
    )
}

export default function EmailRecoverPassword() {
    return (
        <GoogleRecaptcha>
            <Main />
        </GoogleRecaptcha>
    );
}

async function functionToExecuteToPasswordRecovery(username, id, CPF, email, handleReCaptcha) {
    var errors = {}
    const formData = new FormData()
    const key = username ? 'username' : id ? 'id' : CPF ? 'cpf' : email ? 'email' : null;
    const value = username ? username : id ? id : CPF ? CPF : email ? email : null;
    formData.append(key, value)

    NProgress.start()
    var response
    var tokengoogle = await handleReCaptcha()
    try {
        // var URL = __DEV__ ? 'http://10.0.2.3:9001/api-angular/recover-password/' : 'https://leandrocgms.online/api-angular/recover-password/'
        var URL = 'https://leandrocgms.online/api-angular/recover-password/'
        response = await fetch(URL, {
            method: 'POST', // POST aciona o método create que envia o e-mail com o hash de recuperação
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
        setTextModal('Sucesso', `🚀 Enviamos um e-mail para recuperação da sua conta. Leia as instruções dele e acesse o link informado. `)
        NProgress.done()
    } catch (error) {
        var stringErrors = ''
        for (const [key, value] of Object.entries(errors)) {
            stringErrors += `${value}\n`
        }
        console.warn('Erro', `\n\n${getNow()}\nErro ao tentar recuperar senha\n${error.stack}\nLista de Erros: \n${stringErrors}`)
        NProgress.done()
        setTextModal(`😥 Os seguintes erros foram constatados pelo nosso servidor:\n` ? stringErrors :
            `😥 Ocorreu um erro ao tentar recuperar sua senha. Tente novamente em instantes. Se o erro persistir, contact o suporte.`)
    }
}