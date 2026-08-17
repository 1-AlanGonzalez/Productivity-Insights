import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/pages/AuthPage.css"
import { registrarUsuario } from "../services/authService"

function RegisterPage() {
    const navigate = useNavigate()

    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")

    const [errores, setErrores] = useState({
        usuario: "",
        correo: "",
        contrasena: "",
    })

    const [errorGeneral, setErrorGeneral] = useState("")
    const [cargando, setCargando] = useState(false)

    function validarFormulario() {
        const nuevosErrores = {
            usuario: "",
            correo: "",
            contrasena: "",
        }

        if (!nombre.trim()) {
            nuevosErrores.usuario = "El nombre de usuario es obligatorio"
        }

        if (!correo.trim()) {
            nuevosErrores.correo = "El email es obligatorio"
        }

        if (!contrasena.trim()) {
            nuevosErrores.contrasena = "La contraseña es obligatoria"
        } else if (contrasena.length < 8) {
            nuevosErrores.contrasena =
                "La contraseña debe tener al menos 8 caracteres"
        }

        setErrores(nuevosErrores)

        return !Object.values(nuevosErrores).some(
            (error) => error !== ""
        )
    }

    const register = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setErrorGeneral("")

        if (!validarFormulario()) {
            return
        }

        setCargando(true)

        try {
            await registrarUsuario(nombre, correo, contrasena)

            navigate("/login", { replace: true })
        } catch (error) {
            const mensajeError =
                error instanceof Error
                    ? error.message
                    : "No fue posible registrar el usuario"

            // Si el backend devuelve los mensajes neutrales, los asignamos al campo correspondiente
            if (mensajeError.includes("nombre de usuario")) {
                setErrores((prev) => ({ ...prev, usuario: mensajeError }))
            } else if (mensajeError.includes("correo") || mensajeError.includes("email")) {
                setErrores((prev) => ({ ...prev, correo: mensajeError }))
            } else {
                setErrorGeneral(mensajeError)
            }
        } finally {
            setCargando(false)
        }
    }

    return (
        <main className="auth-page">
            <section
                className="auth-window"
                aria-labelledby="register-title"
            >
                <header className="auth-window__intro">
                    <span className="auth-window__brand">
                        Productivity Insights
                    </span>

                    <h1 id="register-title">
                        Crear cuenta
                    </h1>

                    <p>
                        Empezá a organizar tu trabajo en un solo lugar.
                    </p>
                </header>

                <form
                    className="auth-form"
                    onSubmit={register}
                    noValidate
                >
                    <div className="auth-form__field">
                        <label htmlFor="nombre">
                            Nombre de usuario
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            className={
                                errores.usuario
                                    ? "input--error"
                                    : ""
                            }
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={(event) => {
                                setNombre(event.target.value)

                                if (errores.usuario) {
                                    setErrores((prev) => ({
                                        ...prev,
                                        usuario: "",
                                    }))
                                }

                                if (errorGeneral) {
                                    setErrorGeneral("")
                                }
                            }}
                        />

                        {errores.usuario && (
                            <span
                                className="auth-form__field-error"
                                role="alert"
                            >
                                {errores.usuario}
                            </span>
                        )}
                    </div>

                    <div className="auth-form__field">
                        <label htmlFor="correo">
                            Correo
                        </label>

                        <input
                            id="correo"
                            type="email"
                            className={
                                errores.correo
                                    ? "input--error"
                                    : ""
                            }
                            placeholder="nombre@correo.com"
                            value={correo}
                            onChange={(event) => {
                                setCorreo(event.target.value)

                                if (errores.correo) {
                                    setErrores((prev) => ({
                                        ...prev,
                                        correo: "",
                                    }))
                                }

                                if (errorGeneral) {
                                    setErrorGeneral("")
                                }
                            }}
                        />

                        {errores.correo && (
                            <span
                                className="auth-form__field-error"
                                role="alert"
                            >
                                {errores.correo}
                            </span>
                        )}
                    </div>

                    <div className="auth-form__field">
                        <label htmlFor="contrasena">
                            Contraseña
                        </label>

                        <input
                            id="contrasena"
                            type="password"
                            className={
                                errores.contrasena
                                    ? "input--error"
                                    : ""
                            }
                            placeholder="Mínimo 8 caracteres"
                            value={contrasena}
                            onChange={(event) => {
                                setContrasena(event.target.value)

                                if (errores.contrasena) {
                                    setErrores((prev) => ({
                                        ...prev,
                                        contrasena: "",
                                    }))
                                }

                                if (errorGeneral) {
                                    setErrorGeneral("")
                                }
                            }}
                        />

                        {errores.contrasena && (
                            <span
                                className="auth-form__field-error"
                                role="alert"
                            >
                                {errores.contrasena}
                            </span>
                        )}
                    </div>

                    {errorGeneral && (
                        <p
                            className="auth-form__error"
                            role="alert"
                        >
                            {errorGeneral}
                        </p>
                    )}

                    <button
                        className="auth-form__submit"
                        type="submit"
                        disabled={cargando}
                    >
                        {cargando
                            ? "Registrando..."
                            : "Crear cuenta"}
                    </button>
                </form>

                <p className="auth-window__footer">
                    ¿Ya tenés cuenta?{" "}
                    <Link to="/login">
                        Iniciá sesión
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default RegisterPage