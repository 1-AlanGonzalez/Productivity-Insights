import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

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

    const register = async () => {
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

    return (
        <div>
            <h1>Register</h1>

            <label htmlFor="nombre">Username:</label>

            <input
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            {errores.usuario && (
                <p>{errores.usuario}</p>
            )}

            <label htmlFor="correo">Email:</label>

            <input
                id="correo"
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />

            {errores.correo && (
                <p>{errores.correo}</p>
            )}

            <label htmlFor="contrasena">Password:</label>

            <input
                id="contrasena"
                type="password"
                placeholder="Contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
            />

            {errores.contrasena && (
                <p>{errores.contrasena}</p>
            )}

            <button onClick={register} disabled={cargando}>
                {cargando ? "Registrando..." : "Registrar"}
            </button>
        </div>
    )
}

export default RegisterPage