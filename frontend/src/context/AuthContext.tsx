import {createContext, useContext, useEffect, useState, type ReactNode,} from "react"

import {getCurrentUser, login as loginRequest, type SessionUser,} from "../services/authService"

interface AuthContextValue {usuario: SessionUser | null
    comprobandoSesion: boolean
    iniciarSesion: (
        correo: string,
        contrasena: string) => Promise<void>
    }

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {children: ReactNode}

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<SessionUser | null>(null)
    const [comprobandoSesion, setComprobandoSesion] = useState(true)

    useEffect(() => {
        getCurrentUser()
        .then(setUsuario)
        .catch(() => setUsuario(null))
        .finally(() => setComprobandoSesion(false))
    }, [])

    async function iniciarSesion(
        correo: string,
        contrasena: string
    ): Promise<void> {
        await loginRequest(correo, contrasena)

        const usuarioAutenticado = await getCurrentUser()

        if (!usuarioAutenticado) {
        throw new Error("No fue posible recuperar la sesión")
        }

        setUsuario(usuarioAutenticado)
    }

    return (
        <AuthContext.Provider value={{usuario, comprobandoSesion, iniciarSesion,}}>
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextValue {
const context = useContext(AuthContext)

if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider")
}

return context
}