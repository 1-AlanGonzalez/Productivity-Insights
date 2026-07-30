import { useState } from "react";

function RegisterPage() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const register = async () => {
        const response = await fetch("http://localhost:8080/api/authRegister/register", {
            method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            correo,
            contrasena })
        });
        
        const  mensaje = await response.text();

        if(response.ok) { 
            // el response.ok es la respuesta del backend, si es true significa que el usuario se registro correctamente, si es false significa que hubo un error al registrar el usuario
            // true el servidor manda 2xx
            // false el servidor manda 4xx o 5xx
            console.log("User registered successfully");
            console.log(mensaje);
        }
        else{
            console.log("Error registering user");
            console.log(mensaje);
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <label htmlFor="nombre">Username:</label>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor="correo">Email:</label>
            <input
                type="creo"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <label htmlFor="contrasena">Password:</label>
            <input
                type="contrasena"
                placeholder="Contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
            />
            <button onClick={register}>
                Register
            </button>
        </div>
    )
}

export default RegisterPage;