import { initializeApp } from "firebase/app";

/* Importando recursos da biblioteca de autenticação do firebase */
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhEmkbs4FpGGAL4DrGF3PKFMXwpxTw7cU",
  authDomain: "app-autenticacao-91e87.firebaseapp.com",
  projectId: "app-autenticacao-91e87",
  storageBucket: "app-autenticacao-91e87.appspot.com",
  messagingSenderId: "515958928657",
  appId: "1:515958928657:web:2ede4c6c0806e47d6dc8b0",
};

export const app = initializeApp(firebaseConfig);

/* Exportando os recursos de autenticação da biblioteca */
export const auth = getAuth(app);
