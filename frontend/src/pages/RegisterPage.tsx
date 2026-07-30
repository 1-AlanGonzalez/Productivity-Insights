import { useState } from "react";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        const response = await fetch("http://localhost:8080/api/authRegister/register", {
            method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password })
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
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={register}>
                Register
            </button>
        </div>
    )
}

export default RegisterPage;