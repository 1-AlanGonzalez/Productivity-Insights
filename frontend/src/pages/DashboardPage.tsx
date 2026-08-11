import { useEffect, useState } from "react"
import CalendarioSemanal from "../components/CalendarioSemanal"
import CrearTareaForm from "../components/CrearTareaForm"
import EditarTareaForm from "../components/EditarTareaForm"
import FiltrosTareas from "../components/FiltrosTareas"
import OrdenTareas from "../components/OrdenTareas"
import { cambiarEstadoTarea, eliminarTarea, obtenerTareas } from "../services/tareaService"
import "../styles/pages/DashboardPage.css"
import type { FiltroEstado, Prioridad, Tarea } from "../types/Tarea"
import { estaVencida } from "../utils/estadoTarea"
import TaskModal from "../components/TaskModal"
import {
    ordenarTareas,
    type CriterioOrden,
    type PreferenciaOrden,
} from "../utils/ordenarTareas"
import EstadisticaTarea from "../components/EstadisticaTarea"
function DashboardPage() {
    const [tareas, setTareas] = useState<Tarea[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")
    const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null)
    const [creandoTarea, setCreandoTarea] = useState(false)
    const [busqueda, setBusqueda] = useState("")
    const [prioridad, setPrioridad] = useState<Prioridad | "">("")
    const [estado, setEstado] = useState<FiltroEstado>("")
    const [criterioOrden, setCriterioOrden] = useState<CriterioOrden>("FECHA")
    const [preferenciaOrden, setPreferenciaOrden] = useState<PreferenciaOrden>("PROXIMA")
    const [controlesAbiertos, setControlesAbiertos] = useState(false)
    const [tareaEliminando, setTareaEliminando] = useState<{ id: number; titulo: string } | null>(null)
    useEffect(() => {
        async function cargarTareas() {
            try {
                const datos = await obtenerTareas()
                setTareas(datos)
            } catch (errorActual) {
                setError(
                    errorActual instanceof Error
                        ? errorActual.message
                        : "No fue posible obtener las tareas"
                )
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
        const coincideEstado = estado === "" || (estado === "VENCIDA" ? estaVencida(tarea) : tarea.estado === estado)

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

    function handleEliminar(id: number, titulo: string) {
        setTareaEliminando({ id, titulo })
    }

    async function confirmarEliminacion() {
        if (!tareaEliminando) return

        setError("")

        try {
            await eliminarTarea(tareaEliminando.id)
            setTareas((tareasActuales) =>
                tareasActuales.filter((tarea) => tarea.id !== tareaEliminando.id)
            )
        } catch (errorActual) {
            setError(
                errorActual instanceof Error
                    ? errorActual.message
                    : "No fue posible eliminar la tarea"
            )
        } finally {
            setTareaEliminando(null)
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
        } catch (errorActual) {
            setError(
                errorActual instanceof Error
                    ? errorActual.message
                    : "No fue posible cambiar el estado de la tarea"
            )
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
                <section
                className="dashboard-toolbar"
                aria-label="Controles de tareas">
                <button
                    className="dashboard-sidebar__create-task"
                    type="button"
                    onClick={() => setCreandoTarea(true)}
                >
                    <span aria-hidden="true">＋</span>
                    Nueva tarea
                </button>

                 <div className="dashboard-toolbar__panel">
      <button
          type="button"
          className="dashboard-toolbar__toggle"
          aria-expanded={controlesAbiertos}
          aria-controls="task-controls"
          onClick={() =>
              setControlesAbiertos((abiertos) => !abiertos)
          }
      >
          Filtros y ordenamiento

          <span aria-hidden="true">
              {controlesAbiertos ? "−" : "+"}
          </span>
      </button>

      <div
          id="task-controls"
          className={`dashboard-toolbar__controls ${
              controlesAbiertos
                  ? "dashboard-toolbar__controls--open"
                  : ""
          }`}
      >
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
          </div>
        </div>
        <CalendarioSemanal
                    tareas={tareasOrdenadas}
                    onCambiarEstado={handleCambiarEstado}
                    onEditar={setTareaEditando}
                    onEliminar={handleEliminar}
                />
        
            </section>
            <section className="dashboard-content">
            
             {creandoTarea && (
                <TaskModal
                    titleId="create-task-title"
                    onCerrar={() => setCreandoTarea(false)}
                >
                    <CrearTareaForm
                        onCancelar={() => setCreandoTarea(false)}
                        onTareaCreada={(nuevaTarea) => {
                            setTareas((tareasActuales) => [
                                ...tareasActuales,
                                nuevaTarea,
                            ])
                            setCreandoTarea(false)
                        }}
                    />
                </TaskModal>
            )}
            {tareaEditando && (
                <TaskModal
                    titleId="edit-task-title"
                    onCerrar={() => setTareaEditando(null)}
                >
                    <EditarTareaForm
                        key={tareaEditando.id}
                        tarea={tareaEditando}
                        onCancelar={() => setTareaEditando(null)}
                        onActualizada={handleTareaActualizada}
                    />
                </TaskModal>
            )}

            {tareaEliminando && (
                <TaskModal
                    titleId="delete-task-title"
                    onCerrar={() => setTareaEliminando(null)}
                >
                    <div className="modal-confirmacion modal-confirmacion--centrado">
                        <div className="modal-confirmacion__icono">
                            ⚠️
                        </div>
                        <h3 id="delete-task-title">¿Eliminar tarea?</h3>
                        <p>
                            ¿Seguro que querés eliminar <strong>"{tareaEliminando.titulo}"</strong>? Esta acción no se puede deshacer.
                        </p>
                        <div className="modal-confirmacion__acciones">
                            <button
                                type="button"
                                className="btn btn--secundario"
                                onClick={() => setTareaEliminando(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn--peligro"
                                onClick={confirmarEliminacion}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </TaskModal>
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
            <>
                <EstadisticaTarea tareas={tareas} />

                </>)}
            </section>
            </div>
        </main>
    )
}

export default DashboardPage