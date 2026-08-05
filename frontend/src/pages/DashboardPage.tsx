import { useEffect, useState } from "react"
import type { Estado, Prioridad, Tarea } from "../types/Tarea"
import EditarTareaForm from "../components/EditarTareaForm"
import FiltrosTareas from "../components/FiltrosTareas"
import CrearTareaForm from "../components/CrearTareaForm"
import { eliminarTarea, obtenerTareas, cambiarEstadoTarea } from "../services/tareaService"

function DashboardPage() {
    const [tareas, setTareas] = useState<Tarea[]>([]) // Estado para almacenar las tareas obtenidas del backend
    const [cargando, setCargando] = useState(true) // Estado para indicar si las tareas se están cargando
    const [error, setError] = useState("") // Estado para almacenar cualquier mensaje de error al cargar las tareas
    const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null)

    const [busqueda, setBusqueda] = useState("")
    const [prioridad, setPrioridad] = useState<Prioridad | "">("")
    const [estado, setEstado] = useState<Estado | "">("")

    useEffect(() => {
        // método asíncrono para cargar las tareas desde el backend
        async function cargarTareas() {
            try {
                const datos = await obtenerTareas() // Llamada a la función para obtener las tareas desde el backend
                setTareas(datos) // Se actualiza el estado con las tareas obtenidas
            } catch {
                setError("No fue posible obtener las tareas") // Se actualiza el estado de error si ocurre un problema al obtener las tareas
            } finally {
                setCargando(false) // Se indica que la carga de tareas ha finalizado
            }
        }
        cargarTareas()
    }, [])

    const tareasFiltradas = tareas.filter((tarea) => {
        const textoBuscado = busqueda.trim().toLowerCase()

        const coincideBusqueda =
            tarea.titulo.toLowerCase().includes(textoBuscado) ||
            (tarea.descripcion ?? "").toLowerCase().includes(textoBuscado)

        const coincidePrioridad =
            prioridad === "" || tarea.prioridad === prioridad

        const coincideEstado = estado === "" || tarea.estado === estado

        return coincideBusqueda && coincidePrioridad && coincideEstado
    })

     async function handleEliminar(id: number, titulo: string) {
      const confirmada = window.confirm(`¿Seguro que querés eliminar la tarea "${titulo}"?`)
      if (!confirmada) {return}
      setError("")
      try {
          await eliminarTarea(id)
          setTareas((tareasActuales) =>
              tareasActuales.filter((tarea) => tarea.id !== id))
      } catch {
          setError("No fue posible eliminar la tarea")
      }
    }
    async function handleCambiarEstado(tarea: Tarea) {
        setError("")

        try {
            const tareaActualizada = await cambiarEstadoTarea(tarea)

            setTareas((tareasActuales) =>
                tareasActuales.map((tareaActual) =>
                    tareaActual.id === tareaActualizada.id
                        ? tareaActualizada
                        : tareaActual,
                ),
            )
        } catch {
            setError("No fue posible cambiar el estado de la tarea")
        }
    }

    return (
        <div>
            <h1>Mis Tareas</h1>
            <FiltrosTareas
                busqueda={busqueda}
                prioridad={prioridad}
                estado={estado}
                onBusquedaChange={setBusqueda}
                onPrioridadChange={setPrioridad}
                onEstadoChange={setEstado}
            />
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
                                    : tarea,
                            ),
                        )

                        setTareaEditando(null)
                    }}
                />
            )}

            <CrearTareaForm
                onTareaCreada={(nuevaTarea) => {
                    setTareas((anteriores) => [...anteriores, nuevaTarea])
                }}
            />

            <div>
                {cargando && <p>Cargando tareas...</p>}

                {error && <p role="alert">{error}</p>}

                {!cargando && !error && tareas.length === 0 && (
                    <p>No hay tareas para mostrar.</p>
                )}

                {!cargando &&
                    !error &&
                    tareas.length > 0 &&
                    tareasFiltradas.length === 0 && (
                        <p>No hay tareas que coincidan con los filtros.</p>
                    )}

                {!cargando &&
                    !error &&
                    tareasFiltradas.map((tarea) => (
                        <div key={tarea.id}>
 
                            <h3>{tarea.titulo}</h3>
                            <p>{tarea.descripcion}</p>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={tarea.estado === "COMPLETADA"}
                                        onChange={() => handleCambiarEstado(tarea)}/>
                                    Completada
                                </label>
                            <button
                                type="button"
                                onClick={() => setTareaEditando(tarea)}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                onClick={() => handleEliminar(tarea.id, tarea.titulo)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default DashboardPage
