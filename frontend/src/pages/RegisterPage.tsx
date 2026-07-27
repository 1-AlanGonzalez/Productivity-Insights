import { useState } from "react";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        const response = await fetch("/api/register/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });
        const mensaje = await response.text();
        console.log(mensaje);
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