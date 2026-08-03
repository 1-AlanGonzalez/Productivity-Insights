import type { Estado, Prioridad } from "../types/Tarea"

interface FiltrosTareasProps {
    busqueda: string
    prioridad: Prioridad | ""
    estado: Estado | ""
    onBusquedaChange: (valor: string) => void
    onPrioridadChange: (valor: Prioridad | "") => void
    onEstadoChange: (valor: Estado | "") => void
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
        <section>
            <h2>Buscar y filtrar</h2>

            <label htmlFor="taskSearch">
                Buscar:
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

            <label htmlFor="priorityFilter">
                Prioridad:
            </label>

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

            <label htmlFor="statusFilter">
                Estado:
            </label>

            <select
                id="statusFilter"
                value={estado}
                onChange={(event) =>
                    onEstadoChange(
                        event.target.value as Estado | ""
                    )
                }
            >
                <option value="">Todos</option>
                <option value="PENDIENTE">Pendientes</option>
                <option value="COMPLETADA">Completadas</option>
            </select>
        </section>
    )
}

export default FiltrosTareas