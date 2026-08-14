import { useState } from "react"
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

    const [expandido, setExpandido] = useState(false)

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
                    !expandido
                        ? "week-task--collapsed"
                        : "",
                ].filter(Boolean).join(" ")}
                onClick={() => setExpandido((valorActual) => !valorActual)}
                role="button"
                tabIndex={0}
                aria-expanded={expandido}
                onKeyDown={(evento) => {
                    if (evento.key === "Enter" || evento.key === " ") {
                        evento.preventDefault()
                        setExpandido((valorActual) => !valorActual)
                    }
                }}
            >
                <div className="week-task__collapsed-row">
                    <div className="week-task__collapsed-row__top">
                        <label
                            className="week-task__check"
                            onClick={(evento) => evento.stopPropagation()}
                        >
                            <input
                                type="checkbox"
                                checked={tarea.estado === "COMPLETADA"}
                                onChange={() => onCambiarEstado(tarea)}/>
                        </label>

                        <h3>{tarea.titulo}</h3>
                    </div>

                    <span
                        className={`week-task__chevron ${expandido ? "week-task__chevron--open" : ""}`}
                        aria-hidden="true"
                    >
                        ▾
                    </span>
                </div>

                {expandido && (
                    <div className="week-task__details" onClick={(evento) => evento.stopPropagation()}>
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

                        {tareaVencida && (
                            <span className="week-task__overdue-label">
                                Vencida
                            </span>
                        )}

                        {tarea.descripcion && <p>{tarea.descripcion}</p>}

                        <div className="week-task__actions">
                            <button
                                className="week-task__edit"
                                type="button"
                                onClick={() => onEditar(tarea)}
                                title="Editar tarea"
                            >
                                <span className="week-task__btn-icon" aria-hidden="true"></span>
                                <span className="week-task__btn-text">Editar</span>
                            </button>

                            <button
                                className="week-task__delete"
                                type="button"
                                onClick={() => onEliminar(tarea.id, tarea.titulo)}
                                title="Eliminar tarea"
                            >
                                <span className="week-task__btn-icon" aria-hidden="true"></span>
                                <span className="week-task__btn-text">Eliminar</span>
                            </button>
                        </div>
                    </div>
                )}
            </article>
        )
    }

export default TareaCard;