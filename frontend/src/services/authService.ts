// Archivo que sirve para manejar la autenticación de usuarios en el frontend

export async function login(correo: string, contrasena: string) {
const response = await fetch("/api/login", {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        correo,
        contrasena,
    }),
})

if (!response.ok) {
    throw new Error('No fue posible iniciar sesión')
}

return
}

export interface SessionUser {
      correo: string
  }

export async function getCurrentUser(): Promise<SessionUser | null> {
    const response = await fetch("/api/me", {
        credentials: "include",
    })

    if (response.status === 401 || response.status === 403) {
        return null
    }

    if (!response.ok) {
        throw new Error("No fue posible comprobar la sesión")
    }

    return response.json()
}