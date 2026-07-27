import { Route, Routes } from "react-router-dom"
import Register from "./pages/RegisterPage";


function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

  export default App