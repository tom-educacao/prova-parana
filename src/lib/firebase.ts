import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyASdkqsubT8_sAgYaphaIiFaUnRZ-NLbok",
  authDomain: "prova-parana-tom.firebaseapp.com",
  projectId: "prova-parana-tom",
  storageBucket: "prova-parana-tom.firebasestorage.app",
  messagingSenderId: "359949334229",
  appId: "1:359949334229:web:5c54a6fcf044018950545c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Firebase Auth persistence
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Erro ao configurar persistência do Firebase:', error);
});

export { auth };
export default app;
