// Pagina de login de la aplicacion

import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAuth } from "../context/AuthContext"

function LoginPage() {
    const navigate = useNavigate()
    const { iniciarSesion } = useAuth()

    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [cargando, setCargando] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setCargando(true)

        try {
            await iniciarSesion(correo, contrasena)

            toast.success("Inicio de sesión exitoso")

            navigate("/dashboard", { replace: true })
        } catch {
            toast.error("Correo o contraseña incorrectos")
        } finally {
            setCargando(false)
        }
    }

    return (
        <main>
            <h1>Iniciar sesión</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="correo">
                    Correo
                </label>

                <input
                    id="correo"
                    type="email"
                    value={correo}
                    onChange={(event) => setCorreo(event.target.value)}
                    required
                />

                <label htmlFor="contrasena">
                    Contraseña
                </label>

                <input
                    id="contrasena"
                    type="password"
                    value={contrasena}
                    onChange={(event) => setContrasena(event.target.value)}
                    required
                />

                <button type="submit" disabled={cargando}>
                    {cargando ? "Ingresando..." : "Ingresar"}
                </button>
            </form>
        </main>
    )
}

export default LoginPage