import { Route, Routes } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import LoginPage from "./pages/LoginPage"
import Register from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <p>Sesión activa</p>
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App