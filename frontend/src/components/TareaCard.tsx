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
                    <button type="button" onClick={() => onEditar(tarea)}>
                        Editar
                    </button>

                    <button
                        type="button"
                        onClick={() => onEliminar(tarea.id, tarea.titulo)}>
                        Eliminar
                    </button>
                </div>
            </article>
        )
    }

export default TareaCard;