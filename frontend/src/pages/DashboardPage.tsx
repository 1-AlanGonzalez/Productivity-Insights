import { useEffect, useState } from "react"
import CalendarioSemanal from "../components/CalendarioSemanal"
import CrearTareaForm from "../components/CrearTareaForm"
import EditarTareaForm from "../components/EditarTareaForm"
import FiltrosTareas from "../components/FiltrosTareas"
import OrdenTareas from "../components/OrdenTareas"
import { cambiarEstadoTarea, eliminarTarea, obtenerTareas } from "../services/tareaService"
import "../styles/pages/DashboardPage.css"
import type { Estado, Prioridad, Tarea } from "../types/Tarea"
import {
    ordenarTareas,
    type CriterioOrden,
    type PreferenciaOrden,
} from "../utils/ordenarTareas"

function DashboardPage() {
    const [tareas, setTareas] = useState<Tarea[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")
    const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null)

    const [busqueda, setBusqueda] = useState("")
    const [prioridad, setPrioridad] = useState<Prioridad | "">("")
    const [estado, setEstado] = useState<Estado | "">("")
    const [criterioOrden, setCriterioOrden] = useState<CriterioOrden>("FECHA")
    const [preferenciaOrden, setPreferenciaOrden] = useState<PreferenciaOrden>("PROXIMA")

    useEffect(() => {
        async function cargarTareas() {
            try {
                const datos = await obtenerTareas()
                setTareas(datos)
            } catch {
                setError("No fue posible obtener las tareas")
            } finally {
                setCargando(false)
            }
        }

        cargarTareas()
    }, [])

    const tareasFiltradas = tareas.filter((tarea) => {
        const textoBuscado = busqueda.trim().toLowerCase()
        const coincideBusqueda =
            tarea.titulo.toLowerCase().includes(textoBuscado) ||
            (tarea.descripcion ?? "").toLowerCase().includes(textoBuscado)
        const coincidePrioridad = prioridad === "" || tarea.prioridad === prioridad
        const coincideEstado = estado === "" || tarea.estado === estado

        return coincideBusqueda && coincidePrioridad && coincideEstado
    })

    const tareasOrdenadas = ordenarTareas(
        tareasFiltradas,
        criterioOrden,
        preferenciaOrden,
    )

    const tareasCompletadas = tareas.filter((tarea) => tarea.estado === "COMPLETADA").length
    const tareasPendientes = tareas.length - tareasCompletadas
    const porcentajeCompletado = tareas.length === 0
        ? 0
        : Math.round((tareasCompletadas / tareas.length) * 100)

    async function handleEliminar(id: number, titulo: string) {
        const confirmada = window.confirm(`¿Seguro que querés eliminar la tarea "${titulo}"?`)
        if (!confirmada) return

        setError("")

        try {
            await eliminarTarea(id)
            setTareas((tareasActuales) =>
                tareasActuales.filter((tarea) => tarea.id !== id),
            )
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

    function handleTareaActualizada(tareaActualizada: Tarea) {
        setTareas((tareasActuales) =>
            tareasActuales.map((tarea) =>
                tarea.id === tareaActualizada.id ? tareaActualizada : tarea,
            ),
        )
        setTareaEditando(null)
    }

    return (
        <main className="dashboard-page">
            <header className="dashboard-header">
                <div className="dashboard-header__title">
                    <div>
                        <p>Productivity Insights</p>
                    </div>
     
                </div>
            </header>

            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <div className="dashboard-sidebar__heading">
                        <span>Vista semanal</span>
                        <h2>Filtros</h2>
                        <p>Ajustá las tareas que querés ver en el calendario.</p>
                    </div>

                    <FiltrosTareas
                        busqueda={busqueda}
                        prioridad={prioridad}
                        estado={estado}
                        onBusquedaChange={setBusqueda}
                        onPrioridadChange={setPrioridad}
                        onEstadoChange={setEstado}
                    />

                    <OrdenTareas
                        criterio={criterioOrden}
                        preferencia={preferenciaOrden}
                        onCriterioChange={setCriterioOrden}
                        onPreferenciaChange={setPreferenciaOrden}
                    />
                </aside>

                <section className="dashboard-content">
                    

                    {tareaEditando && (
                        <EditarTareaForm
                            key={tareaEditando.id}
                            tarea={tareaEditando}
                            onCancelar={() => setTareaEditando(null)}
                            onActualizada={handleTareaActualizada}
                        />
                    )}

                    {cargando && <p className="dashboard-message">Cargando tareas...</p>}
                    {error && <p className="dashboard-message dashboard-message--error" role="alert">{error}</p>}
                    {!cargando && !error && tareas.length === 0 && (
                        <p className="dashboard-message">Todavía no hay tareas. Creá la primera para comenzar.</p>
                    )}
                    {!cargando && !error && tareas.length > 0 && tareasFiltradas.length === 0 && (
                        <p className="dashboard-message">No hay tareas que coincidan con los filtros.</p>
                    )}

                    {!cargando && !error && (
                        <CalendarioSemanal
                            tareas={tareasOrdenadas}
                            onCambiarEstado={handleCambiarEstado}
                            onEditar={setTareaEditando}
                            onEliminar={handleEliminar}
                        />
                    )}
                    <CrearTareaForm
                        onTareaCreada={(nuevaTarea) =>
                            setTareas((tareasActuales) => [...tareasActuales, nuevaTarea])
                        }
                    />
                </section>
            </div>
            
        </main>
    )
}

export default DashboardPage
