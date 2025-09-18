"use client"
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, User } from 'firebase/auth'; // Importando as funções de autenticação
import { auth } from '../firebase/firebaseConfig'; // Importando o auth do Firebase
import { useRouter } from 'next/navigation'; // Usar 'next/navigation' para evitar erro SSR
import { Eye, EyeOff } from 'lucide-react'; // Ícones para mostrar/esconder a senha

const AuthButton: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Tipando o estado como firebase.auth.User ou null
  const [email, setEmail] = useState(''); // Estado para armazenar o email do usuário
  const [password, setPassword] = useState(''); // Estado para armazenar a senha do usuário
  const [error, setError] = useState<string>(''); // Estado para mensagens de erro
  const [showLogin, setShowLogin] = useState(false); // Controla se o formulário de login será exibido
  const [showPassword, setShowPassword] = useState(false); // Controla a visibilidade da senha
  const router = useRouter();

  // Função para mostrar/ocultar o formulário de login
  const toggleLoginForm = () => {
    setShowLogin(!showLogin); // Alterna o estado de exibição do formulário de login
  };

  // Função para login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password); // Tentando logar com email e senha
      router.push('/dashboard'); // Redireciona para o Dashboard
    } catch (error) {
      setError('Falha na autenticação. Verifique as credenciais!');
    }
  };

  // Função para resetar a senha
  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email); // Envia e-mail para resetar a senha
      alert('E-mail de redefinição de senha enviado com sucesso!');
    } catch (error) {
      setError('Erro ao enviar e-mail de redefinição de senha');
    }
  };

  return (
    <>
      {/* Botão de Acessar Dashboard na NavBar */}
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={toggleLoginForm}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 text-sm md:px-6 md:py-3 rounded-md text-white"
        >
          Acessar Dashboard
        </button>
      </div>

      {/* Formulário de Login */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Entrar</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-3 mb-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Exibe a senha ou não com base no estado
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="border p-3 mb-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Alterna a visibilidade da senha
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 text-sm md:px-6 md:py-3 rounded-md text-white"
            >
              Entrar
            </button>
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

            {/* Link para recuperação de senha */}
            <div className="mt-4 text-center">
              <button
                onClick={handlePasswordReset}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Esqueceu a senha?
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;
