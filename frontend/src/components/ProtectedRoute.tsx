import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

interface ProtectedRouteProps {
children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
const { usuario, comprobandoSesion } = useAuth()

if (comprobandoSesion) {
    return <p>Comprobando sesión...</p>
}

if (!usuario) {
    return <Navigate to="/login" replace />
}

return children
}

export default ProtectedRoute