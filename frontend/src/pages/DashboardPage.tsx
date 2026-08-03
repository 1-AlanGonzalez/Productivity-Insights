import { useEffect, useState } from "react"
import type { Tarea } from "../types/Tarea"
import EditarTareaForm from "../components/EditarTareaForm"

function DashboardPage() {
    const [tareas, setTareas] = useState<Tarea[]>([]) // Estado para almacenar las tareas obtenidas del backend
    const [cargando, setCargando] = useState(true) // Estado para indicar si las tareas se están cargando
    const [error, setError] = useState("") // Estado para almacenar cualquier mensaje de error al cargar las tareas
    const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null)
    useEffect(() => {
        // método asíncrono para cargar las tareas desde el backend
      async function cargarTareas() {
          try {
              const response = await fetch("/api/tarea", { // Se realiza una solicitud GET a la ruta del backend para obtener las tareas
                  credentials: "include",
              })

              if (!response.ok) {
                  throw new Error("No fue posible obtener las tareas")
              }

              const datos: Tarea[] = await response.json() // Se parsea la respuesta JSON a un array de tareas
              setTareas(datos)
          } catch {
              setError("No fue posible cargar las tareas")
          } finally {
              setCargando(false)
          }
      }

      cargarTareas()
  }, [])

    return(
        <div>
            <h1>Mis Tareas</h1>
                    {tareaEditando && (
                        <EditarTareaForm
                            key={tareaEditando.id}
                            tarea={tareaEditando}
                            onCancelar={() => setTareaEditando(null)}
                            onActualizada={(tareaActualizada) => {
                                setTareas((tareasActuales) =>
                                    tareasActuales.map((tarea) =>
                                        tarea.id === tareaActualizada.id
                                            ? tareaActualizada
                                            : tarea))

                                setTareaEditando(null)
                            }}/>)}

            <label htmlFor="taskName">Nombre de la tarea:</label>
            <input type="text" id="taskName" placeholder="nombre de la tarea" />
            <label htmlFor="taskDescription">Descripción de la tarea:</label>
            <textarea id="taskDescription" placeholder="descripción de la tarea"></textarea>

            <button>Agregar tarea</button>

            <div>
                {cargando && <p>Cargando tareas...</p>}

                {error && <p role="alert">{error}</p>}

                {!cargando && !error && tareas.length === 0 && (
                    <p>No hay tareas para mostrar.</p>
                )}

                {!cargando && !error && tareas.map((tarea) => (
                    <div key={tarea.id}>
                        <h3>{tarea.titulo}</h3>
                        <p>{tarea.descripcion}</p>
                        <button type="button" onClick={() => setTareaEditando(tarea)}>
                            Editar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    
        
    
    )
}

export default DashboardPage