import { Tarea } from "../types/Tarea";
import { estaVencida } from "../utils/estadoTarea"

interface TareaCardProps {
    tarea: Tarea;
    onEditar: (tarea: Tarea) => void;
    onEliminar: (id: number, titulo: string) => void
    onCambiarEstado: (tarea: Tarea) => void
}


function TareaCard({
    tarea,
    onEditar,
    onEliminar,
    onCambiarEstado,
}: TareaCardProps) {
    
    const tareaVencida = estaVencida(tarea)
    const nombrePrioridad = tarea.prioridad || "Sin prioridad"

    const clasePrioridad = tarea.prioridad
        ? tarea.prioridad.toLowerCase()
        : "sin-prioridad"
    return (
            <article
                className={[
                    "week-task",
                    tarea.estado === "COMPLETADA"
                        ? "week-task--completed"
                        : "",
                    tareaVencida
                        ? "week-task--overdue"
                        : "",
                ].filter(Boolean).join(" ")}>
                    <div className="week-task__top">
                        <span
                            className={`week-task__priority week-task__priority--${clasePrioridad}`}
                        >
                            {nombrePrioridad}
                        </span>

                        {tarea.categoria && (
                            <span className="week-task__category">
                                {tarea.categoria}
                            </span>
                        )}
                    </div>
                <h3>{tarea.titulo}</h3>
                {tareaVencida && (
                    <span className="week-task__overdue-label">
                        Vencida
                    </span>
                )}
                {tarea.descripcion && <p>{tarea.descripcion}</p>}

                <label className="week-task__check">
                    <input
                        type="checkbox"
                        checked={tarea.estado === "COMPLETADA"}
                        onChange={() => onCambiarEstado(tarea)}/>
                    <span>Completada</span>
                </label>

                <div className="week-task__actions">
                     <button
                        className="week-task__edit"
                        type="button"
                        onClick={() => onEditar(tarea)}
                    >
                        Editar
                    </button>

                    <button
                        className="week-task__delete"
                        type="button"
                        onClick={() => onEliminar(tarea.id, tarea.titulo)}
                    >
                        Eliminar
                    </button>
                </div>
            </article>
        )
    }

export default TareaCard;