import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import "../styles/pages/AuthPage.css"

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

    const register = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()
    if (!validarFormulario()) return

        setCargando(true)

        try {
            const response = await fetch("/api/authRegister/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    correo,
                    contrasena,
                }),
            })

            if (response.ok) {
                toast.success("Usuario registrado correctamente")
                navigate("/login", { replace: true })
                return
            }

            const mensaje = await response.json()

            toast.error(
                mensaje.message || "No fue posible registrar el usuario"
            )
        } catch {
            toast.error("No fue posible conectar con el servidor")
        } finally {
            setCargando(false)
        }
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
                  <h1 id="register-title">Crear cuenta</h1>
                  <p>Empezá a organizar tu trabajo en un solo lugar.</p>
              </header>

              <form className="auth-form" onSubmit={register}>
                  <div className="auth-form__field">
                      <label htmlFor="nombre">
                          Nombre de usuario
                      </label>
                      <input
                          id="nombre"
                          type="text"
                          placeholder="Tu nombre"
                          value={nombre}
                          onChange={(event) =>
                              setNombre(event.target.value)
                          }
                          required
                      />
                      {errores.usuario && (
                          <p className="auth-form__error" role="alert">
                              {errores.usuario}
                          </p>
                      )}
                  </div>

                  <div className="auth-form__field">
                      <label htmlFor="correo">Correo</label>
                      <input
                          id="correo"
                          type="email"
                          placeholder="nombre@correo.com"
                          value={correo}
                          onChange={(event) =>
                              setCorreo(event.target.value)
                          }
                          required
                      />
                      {errores.correo && (
                          <p className="auth-form__error" role="alert">
                              {errores.correo}
                          </p>
                      )}
                  </div>

                  <div className="auth-form__field">
                      <label htmlFor="contrasena">
                          Contraseña
                      </label>
                      <input
                          id="contrasena"
                          type="password"
                          placeholder="Mínimo 8 caracteres"
                          value={contrasena}
                          onChange={(event) =>
                              setContrasena(event.target.value)
                          }
                          minLength={8}
                          required
                      />
                      {errores.contrasena && (
                          <p className="auth-form__error" role="alert">
                              {errores.contrasena}
                          </p>
                      )}
                  </div>

                  <button
                      className="auth-form__submit"
                      type="submit"
                      disabled={cargando}
                  >
                      {cargando ? "Registrando..." : "Crear cuenta"}
                  </button>
              </form>

              <p className="auth-window__footer">
                  ¿Ya tenés cuenta?{" "}
                  <Link to="/login">Iniciá sesión</Link>
              </p>
          </section>
      </main>
  )
}

export default RegisterPage