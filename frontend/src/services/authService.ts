// Archivo que sirve para manejar la autenticación de usuarios en el frontend

export async function login(correo: string, contrasena: string) {
const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    correo,
    contrasena,
    }),
})

if (!response.ok) {
    throw new Error('No fue posible iniciar sesión')
}

return response.json()
}