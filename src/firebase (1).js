import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyA-fuFrcLsUpUIkL40qcgxj2IGllN-SvwE',
  authDomain: 'chino-a425c.firebaseapp.com',
  databaseURL: 'https://chino-a425c-default-rtdb.firebaseio.com',
  projectId: 'chino-a425c',
  storageBucket: 'chino-a425c.firebasestorage.app',
  messagingSenderId: '772632398264',
  appId: '1:772632398264:web:c20e9d76a02aa3214da74d',
}

// Nombre propio para no pisar otras instancias de Firebase
const app = getApps().find((a) => a.name === 'vitrina-admin') || initializeApp(firebaseConfig, 'vitrina-admin')

export const auth = getAuth(app)
export const db = getDatabase(app)
