"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

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

		const newToken = await executeRecaptcha('action'); // 'homepage' é uma action específica, você pode definir a sua
		setToken(newToken);
		console.log('Token do reCAPTCHA:', newToken);
		// Agora você pode enviar este token para o seu backend para verificação.
	};

	useEffect(() => {
		// Chame a função para obter o token quando necessário, por exemplo, ao enviar um formulário.
		// Você pode associar isso a um evento de clique de botão ou outra ação.
	}, [executeRecaptcha]);
	const handleSubmit = async (event) => {
		event.preventDefault();
		await handleReCaptcha();
		// Aqui você enviaria os dados do formulário junto com o token para o seu backend.
		if (token) {
			console.log('Enviando dados com token:', token);
			// Faça a chamada para a sua API de backend aqui
		} else {
			console.log('Token do reCAPTCHA não gerado.');
		}
	};
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
					Redefinir Senha
				</h1>

				<div>
					<label className="block text-sm font-medium text-gray-700">
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
					<label className="block text-sm font-medium text-gray-700">
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
					<label className="block text-sm font-medium text-gray-700">
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
					<label className="block text-sm font-medium text-gray-700">
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
						handleSubmit(event);
						// sendForm(id, hash, password, passwordConfirm)
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

export default function Home() {
	return (
		<GoogleReCaptchaProvider reCaptchaKey="6LfUDVQeAAAAAAfI1-Hf3Sz9ZT56MMr-PDQO5vaG">
			<Form />
		</GoogleReCaptchaProvider>
	);
}

async function generateGoogleToken(executeRecaptcha) {
	if (!executeRecaptcha) return;

	return await executeRecaptcha('form_submit');

	// const res = await fetch('/api/verify-recaptcha', {
	// 	method: 'POST',
	// 	body: JSON.stringify({ token }),
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// });

	// const data = await res.json();
	// console.log('Verification result:', data);
};

async function sendForm(id, hash, password, passwordConfirm) {
	console.warn("função disparada com sucesso. ", id, hash, password, passwordConfirm)
	console.warn("google token: \n\n")
}
