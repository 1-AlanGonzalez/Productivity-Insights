import type { Tarea } from "../types/Tarea"

type DatosVencimiento = Pick<Tarea, "estado" |
"fechaLimite">

export function obtenerFechaLocalISO(fecha = new
Date()): string {
    const anio = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2,
    "0")
    const dia = String(fecha.getDate()).padStart(2, "0")

    return `${anio}-${mes}-${dia}`
}

export function estaVencida(
    tarea: DatosVencimiento,
    hoy = obtenerFechaLocalISO(),
): boolean {
    if (tarea.estado !== "PENDIENTE" || !
    tarea.fechaLimite) {
        return false
    }

    return tarea.fechaLimite < hoy
}