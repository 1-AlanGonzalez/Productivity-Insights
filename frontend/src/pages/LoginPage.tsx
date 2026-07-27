// Pagina de login de la aplicacion

import { FormEvent, useState } from 'react'
import { login } from '../services/authService'

function LoginPage() {
const [correo, setCorreo] = useState('')
const [contrasena, setContrasena] = useState('')
const [cargando, setCargando] = useState(false)
const [error, setError] = useState('')

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setCargando(true)

    try {
        const usuario = await login(correo, contrasena)
        console.log('Usuario autenticado:', usuario)
    } catch {
        setError('Correo o contraseña incorrectos')
    } finally {
        setCargando(false)
    }
}

return (
    <main>
    <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>

        <label htmlFor="correo">Correo</label>
        <input
            id="correo"
            type="email"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
            required
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(event) => setContrasena(event.target.value)}
            required
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
    </form>
    </main>
)
}

export default LoginPage