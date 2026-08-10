import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/pages/AuthPage.css"

function LoginPage() {
    const navigate = useNavigate()
    const { iniciarSesion } = useAuth()
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState('')
    const [errores, setErrores] = useState({
        correo: '',
        contrasena: ''
    })

    function validarFormulario() {
        const nuevosErrores = {
            correo: '',
            contrasena: ''
        }

        if (!correo.trim()) {
            nuevosErrores.correo = 'El correo es obligatorio'
        }

        if (!contrasena.trim()) {
            nuevosErrores.contrasena = 'La contraseña es obligatoria'
        }

        setErrores(nuevosErrores)

        return Object.values(nuevosErrores).every((err) => err === '')
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')

        if (!validarFormulario()) return

        setCargando(true)

        try {
            await iniciarSesion(correo, contrasena)
            navigate("/dashboard", { replace: true })
        } catch {
            setError('Correo o contraseña incorrectos')
        } finally {
            setCargando(false)
        }
    }

    return (
        <main className="auth-page">
            <section
                className="auth-window"
                aria-labelledby="login-title"
            >
                <header className="auth-window__intro">
                    <span className="auth-window__brand">
                        Productivity Insights
                    </span>
                    <h1 id="login-title">Iniciar sesión</h1>
                    <p>Organizá tus tareas y mantené el foco.</p>
                </header>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <div className="auth-form__field">
                        <label htmlFor="correo">Correo</label>
                        <input
                            id="correo"
                            type="email"
                            className={errores.correo ? "input--error" : ""}
                            value={correo}
                            onChange={(event) => {
                                setCorreo(event.target.value)
                                if (errores.correo) setErrores(prev => ({ ...prev, correo: '' }))
                            }}
                        />
                        {errores.correo && (
                            <span className="auth-form__field-error">{errores.correo}</span>
                        )}
                    </div>

                    <div className="auth-form__field">
                        <label htmlFor="contrasena">
                            Contraseña
                        </label>
                        <input
                            id="contrasena"
                            type="password"
                            className={errores.contrasena ? "input--error" : ""}
                            value={contrasena}
                            onChange={(event) => {
                                setContrasena(event.target.value)
                                if (errores.contrasena) setErrores(prev => ({ ...prev, contrasena: '' }))
                            }}
                        />
                        {errores.contrasena && (
                            <span className="auth-form__field-error">{errores.contrasena}</span>
                        )}
                    </div>

                    {error && (
                        <p className="auth-form__error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        className="auth-form__submit"
                        type="submit"
                        disabled={cargando}
                    >
                        {cargando ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>

                <p className="auth-window__footer">
                    ¿No tenés cuenta?{" "}
                    <Link to="/register">Registrate</Link>
                </p>
            </section>
        </main>
    )
}

export default LoginPage