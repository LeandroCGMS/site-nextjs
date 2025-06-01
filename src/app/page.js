"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation";
import { FaHeart, FaUsb, FaHdd } from '@/utils/functions';

export default function Home() {
    const router = useRouter();
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LfUDVQeAAAAAAfI1-Hf3Sz9ZT56MMr-PDQO5vaG">
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md text-center">

                    {/* 🔽 Card de Links Amazon */}
                    <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg max-w-md w-full mb-6 border border-gray-200">
                        <h4 className="text-xl font-semibold mb-1">
                            Save money and support our site by choosing one of the options below:
                        </h4>
                        <h4 className="text-lg text-gray-600 mb-4">
                            Economize e apoie nosso trabalho, com uma das opções abaixo:
                        </h4>
                        <div className="space-y-3">
                            <a href="https://amzn.to/4mHrnxs" target="_blank" className="block w-full text-center bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-400 transition">
                                <FaHeart size={20} />
                                Presente para o dia dos namorados
                            </a>
                            <a href="https://amzn.to/3HB8coI" target="_blank" className="block w-full text-center bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                                <FaUsb size={20} />
                                Pendrives de 64GB
                            </a>
                            <a href="https://amzn.to/3HB7Sq0" target="_blank" className="block w-full text-center bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition">
                                <FaHdd size={20} />
                                SSDs NVME M.2
                            </a>
                        </div>
                    </div>

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
    if (window != undefined) {
        window.location.href = "https://leandrocgms.online";
    }
}
