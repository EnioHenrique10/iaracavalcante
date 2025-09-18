import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// ✅ Coloque suas credenciais aqui:
const firebaseConfig = {
  apiKey: "AIzaSyAh6MegWGWJrC1ow9tXX64TvEQkoMVmDOY",
  authDomain: "clinicamedica-14e2c.firebaseapp.com",
  projectId: "clinicamedica-14e2c",
  storageBucket: "clinicamedica-14e2c.firebasestorage.app",
  messagingSenderId: "444854363302",
  appId: "1:444854363302:web:45e7be99c5915407e1c067"
};

// Inicializa o app do Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore para uso em outros arquivos
const db = getFirestore(app);

// Inicializa o Firebase Authentication
const auth = getAuth(app);

// Exporta o Firestore e o Auth para uso em outros arquivos
export { db, auth };
