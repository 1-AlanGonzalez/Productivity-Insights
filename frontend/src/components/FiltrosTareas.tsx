import type { FiltroEstado, Prioridad } from "../types/Tarea"
import "../styles/components/FiltrosTareas.css"

interface FiltrosTareasProps {
    busqueda: string
    prioridad: Prioridad | ""
    estado: FiltroEstado
    onBusquedaChange: (valor: string) => void
    onPrioridadChange: (valor: Prioridad | "") => void
    onEstadoChange: (valor: FiltroEstado) => void
}

function FiltrosTareas({
    busqueda,
    prioridad,
    estado,
    onBusquedaChange,
    onPrioridadChange,
    onEstadoChange,
}: FiltrosTareasProps) {
    return (
        <details className="task-filters-panel" open>
          <summary>Buscar y filtrar</summary>

            <div className="task-filters">
                <div className="task-filters__field">
                    <label htmlFor="taskSearch">Buscar:
                    </label>

                    <input
                        id="taskSearch"
                        type="search"
                        value={busqueda}
                        placeholder="Título o descripción"
                        onChange={(event) =>
                            onBusquedaChange(event.target.value)
                        }
                    />
                </div>
                <div className="task-filters__field">
                    <label htmlFor="priorityFilter">Prioridad:</label>
                    <select
                        id="priorityFilter"
                        value={prioridad}
                        onChange={(event) =>
                            onPrioridadChange(
                                event.target.value as Prioridad | ""
                            )
                        }
                    >
                        <option value="">Todas</option>
                        <option value="ALTA">Alta</option>
                        <option value="MEDIA">Media</option>
                        <option value="BAJA">Baja</option>
                    </select>
                </div>
                <div className="task-filters__field">
                    <label htmlFor="statusFilter">
                    Estado:
                    </label>

                    <select
                        id="statusFilter"
                        value={estado}
                        onChange={(event) => onEstadoChange(event.target.value as FiltroEstado)}>
                        <option value="">Todos</option>
                        <option value="PENDIENTE">Pendientes</option>
                        <option value="COMPLETADA">Completadas</option>
                        <option value="VENCIDA">Vencidas</option>
                    </select>
                </div>
            </div>
        </details>
    )
}

export default FiltrosTareas
