import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// ⚠️ Pegá acá el firebaseConfig del proyecto de Firebase que vas a usar para el panel
// (Firebase Console → Configuración del proyecto → Tus apps → Configuración del SDK)
const firebaseConfig = {
  apiKey: 'PEGAR_AQUI',
  authDomain: 'PEGAR_AQUI',
  databaseURL: 'PEGAR_AQUI',
  projectId: 'PEGAR_AQUI',
  appId: 'PEGAR_AQUI',
}

// Nombre propio para no pisar otras instancias de Firebase
const app = getApps().find((a) => a.name === 'vitrina-admin') || initializeApp(firebaseConfig, 'vitrina-admin')

export const auth = getAuth(app)
export const db = getDatabase(app)
