"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<GoogleReCaptchaProvider reCaptchaKey="6LfUDVQeAAAAAAfI1-Hf3Sz9ZT56MMr-PDQO5vaG">
			<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Este site está em desenvolvimento</h1>
                <p className="mb-6">Estamos trabalhando para trazer novidades em breve!</p>
                <div className="flex flex-col gap-4">
                    <a
                        // href="https://leandrocgms.online"
						onClick={redirectToHome}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Ir para Página Inicial
                    </a>
                    <button
                        onClick={() => router.push("/recover-password")}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Recuperação de Contas
                    </button>
                </div>
            </div>
        </div>
		</GoogleReCaptchaProvider>
	);
}

async function redirectToHome() {
	if (window != undefined){
		window.location.href = "https://leandrocgms.online";
	}
}
