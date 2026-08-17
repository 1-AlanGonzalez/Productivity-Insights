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
        const errorText = await response.text().catch(() => "")
        let mensaje = "No fue posible iniciar sesión"
        try {
            const data = JSON.parse(errorText)
            mensaje = data.message || data.error || mensaje
        } catch {
            if (errorText) mensaje = errorText
        }
        throw new Error(mensaje)
    }

    return
}

export async function registrarUsuario(nombre: string, correo: string, contrasena: string) {
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

    if (!response.ok) {
        // Lee el mensaje real enviado por la BusinessException del backend
        const errorText = await response.text().catch(() => "")
        let mensaje = "No fue posible registrar el usuario"

        try {
            const data = JSON.parse(errorText)
            mensaje = data.message || data.error || mensaje
        } catch {
            if (errorText) mensaje = errorText
        }

        throw new Error(mensaje)
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