// Pagina de login de la aplicacion

import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "sonner"
import "../styles/pages/AuthPage.css"

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

              <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="auth-form__field">
                      <label htmlFor="correo">Correo</label>
                      <input
                          id="correo"
                          type="email"
                          value={correo}
                          onChange={(event) =>
                              setCorreo(event.target.value)
                          }
                          required
                      />
                  </div>

                  <div className="auth-form__field">
                      <label htmlFor="contrasena">
                          Contraseña
                      </label>
                      <input
                          id="contrasena"
                          type="password"
                          value={contrasena}
                          onChange={(event) =>
                              setContrasena(event.target.value)
                          }
                          required
                      />
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