import { useState } from "react";
import { useNavigate } from "react-router-dom"

function RegisterPage() {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const [error, setError] = useState("")
    const [cargando, setCargando] = useState(false)

    const register = async () => {
        setError("")  // Si hubo un error, lo reseteamos
        setCargando(true) // Indicamos que estamos cargando
        try {
            const response = await fetch("/api/authRegister/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    correo,
                    contrasena })
                });
                
                if(response.ok) { 
                    // el response.ok es la respuesta del backend, si es true significa que el usuario se registro correctamente, si es false significa que hubo un error al registrar el usuario
                    // true el servidor manda 2xx
                    // false el servidor manda 4xx o 5xx
                    navigate("/login", { replace: true })
                    return
                }
                const  mensaje = await response.json();
                setError(mensaje.message || "No fue posible registrar el usuario")
            } 
            catch { setError("No fue posible conectar con el servidor") } 
            finally { setCargando(false)}
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
            <label htmlFor="correo">Email:</label>
            <input
                id="correo"
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <label htmlFor="contrasena">Password:</label>
            <input
                id="contrasena"
                type="password"
                placeholder="Contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
            />
            {error && <p role="alert">{error}</p>}
            <button onClick={register} disabled={cargando}>
                {cargando ? "Registrando..." : "Registrar"}
            </button>
        </div>
    )
}

export default RegisterPage;