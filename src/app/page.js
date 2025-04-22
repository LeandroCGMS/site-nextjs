import Image from "next/image";

export default function Home() {
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
              type="password"
              className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirme a nova senha"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors mt-2"
          >
            Alterar Senha
          </button>
      </div>
    </div>
  );
}
