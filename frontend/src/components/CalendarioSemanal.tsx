import { useState } from "react"
import type { Tarea } from "../types/Tarea"
import "../styles/components/CalendarioSemanal.css"

interface CalendarioSemanalProps {
    tareas: Tarea[]
    onCambiarEstado: (tarea: Tarea) => void
    onEditar: (tarea: Tarea) => void
    onEliminar: (id: number, titulo: string) => void
}

const nombresDias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

function obtenerLunes(fecha: Date): Date {
    const lunes = new Date(fecha)
    const dia = lunes.getDay() || 7
    lunes.setDate(lunes.getDate() - dia + 1)
    lunes.setHours(0, 0, 0, 0)
    return lunes
}

function fechaLocalISO(fecha: Date): string {
    const anio = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, "0")
    const dia = String(fecha.getDate()).padStart(2, "0")
    return `${anio}-${mes}-${dia}`
}

function CalendarioSemanal({
    tareas,
    onCambiarEstado,
    onEditar,
    onEliminar,
}: CalendarioSemanalProps) {
    const [inicioSemana, setInicioSemana] = useState(() => obtenerLunes(new Date()))

    const dias = nombresDias.map((nombre, indice) => {
        const fecha = new Date(inicioSemana)
        fecha.setDate(inicioSemana.getDate() + indice)

        return {
            nombre,
            fecha,
            clave: fechaLocalISO(fecha),
        }
    })

    const finSemana = dias[dias.length - 1].fecha
    const tareasSinFecha = tareas.filter((tarea) => !tarea.fechaLimite)

    function cambiarSemana(cantidad: number) {
        setInicioSemana((semanaActual) => {
            const nuevaSemana = new Date(semanaActual)
            nuevaSemana.setDate(nuevaSemana.getDate() + cantidad * 7)
            return nuevaSemana
        })
    }

    function renderTarea(tarea: Tarea) {
        const clasePrioridad = tarea.prioridad
            ? tarea.prioridad.toLowerCase()
            : "sin-prioridad"

        return (
            <article
                className={`week-task ${tarea.estado === "COMPLETADA" ? "week-task--completed" : ""}`}
                key={tarea.id}
            >
                <div className="week-task__top">
                    <span className={`week-task__priority week-task__priority--${clasePrioridad}`}>
                        {tarea.prioridad || "Sin prioridad"}
                    </span>
                    {tarea.categoria && <span className="week-task__category">{tarea.categoria}</span>}
                </div>

                <h3>{tarea.titulo}</h3>
                {tarea.descripcion && <p>{tarea.descripcion}</p>}

                <label className="week-task__check">
                    <input
                        type="checkbox"
                        checked={tarea.estado === "COMPLETADA"}
                        onChange={() => onCambiarEstado(tarea)}
                    />
                    <span>Completada</span>
                </label>

                <div className="week-task__actions">
                    <button type="button" onClick={() => onEditar(tarea)}>
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

    return (
        <section className="weekly-calendar" aria-labelledby="weekly-calendar-title">
            <header className="weekly-calendar__header">
                <div>
                    <p>Planificación</p>
                    <h2 id="weekly-calendar-title">Semana actual</h2>
                    <span>
                        {inicioSemana.toLocaleDateString("es-AR", { day: "2-digit", month: "short" })}
                        {" — "}
                        {finSemana.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                </div>

                <nav className="weekly-calendar__navigation" aria-label="Cambiar semana">
                    <button type="button" onClick={() => cambiarSemana(-1)} aria-label="Semana anterior">←</button>
                    <button type="button" onClick={() => setInicioSemana(obtenerLunes(new Date()))}>Hoy</button>
                    <button type="button" onClick={() => cambiarSemana(1)} aria-label="Semana siguiente">→</button>
                </nav>
            </header>

            <div className="weekly-calendar__scroll">
                <div className="weekly-calendar__grid">
                    {dias.map((dia) => {
                        const tareasDelDia = tareas.filter((tarea) => tarea.fechaLimite === dia.clave)
                        const esHoy = dia.clave === fechaLocalISO(new Date())

                        return (
                            <section className={`week-day ${esHoy ? "week-day--today" : ""}`} key={dia.clave}>
                                <header className="week-day__header">
                                    <span>{dia.nombre}</span>
                                    <strong>{dia.fecha.getDate()}</strong>
                                </header>

                                <div className="week-day__tasks">
                                    {tareasDelDia.length > 0
                                        ? tareasDelDia.map(renderTarea)
                                        : <p className="week-day__empty">Sin tareas</p>}
                                </div>
                            </section>
                        )
                    })}
                </div>
            </div>

            {tareasSinFecha.length > 0 && (
                <section className="undated-tasks">
                    <div className="undated-tasks__heading">
                        <h3>Sin fecha asignada</h3>
                        <span>{tareasSinFecha.length}</span>
                    </div>
                    <div className="undated-tasks__grid">
                        {tareasSinFecha.map(renderTarea)}
                    </div>
                </section>
            )}
        </section>
    )
}

export default CalendarioSemanal
