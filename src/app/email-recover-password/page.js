"use client";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FaKey } from '@/utils/functions';
import { useRouter } from 'next/navigation'; // Importação do useRouter
import { useEffect, useRef, useState } from "react";

function Main() {
    const router = useRouter(); // Inicializa o hook useRouter
    const [btnAccessHover, setBtnAccessHover] = useState(false)
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
                    type="text"
                    placeholder="Nome de Usuário"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <input
                    type="text"
                    placeholder="ID do Usuário"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <input
                    type="text"
                    placeholder="C.P.F do Usuário"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <input
                    type="text"
                    placeholder="E-mail do Usuário"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <button className="bg-blue-400 p-2 rounded-xl border border-blue-500 border-2 cursor-pointer active:bg-blue-500 active:border-3 active:border-blue-800">Enviar E-mail de Recuperação</button>
            </div>
        </div>
    )
}

export default function EmailRecoverPassword() {
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LfUDVQeAAAAAAfI1-Hf3Sz9ZT56MMr-PDQO5vaG">
            <Main />
        </GoogleReCaptchaProvider>
    );
}