import type { Tarea } from "../types/Tarea"

export type CriterioOrden =
    | "FECHA"
    | "PRIORIDAD"
    | "ESTADO"

export type PreferenciaOrden =
    | "PROXIMA"
    | "LEJANA"
    | "ALTA"
    | "MEDIA"
    | "BAJA"
    | "PENDIENTE"
    | "COMPLETADA"

export function ordenarTareas(
    tareas: Tarea[],
    criterio: CriterioOrden,
    preferencia: PreferenciaOrden,
): Tarea[] {
    return [...tareas].sort((tareaA, tareaB) => {
        switch (criterio) {
            case "FECHA":
                return compararFecha(
                    tareaA,
                    tareaB,
                    preferencia,
                )

            case "PRIORIDAD":
                return compararValorPreferido(
                    tareaA.prioridad,
                    tareaB.prioridad,
                    preferencia,
                )

            case "ESTADO":
                return compararValorPreferido(
                    tareaA.estado,
                    tareaB.estado,
                    preferencia,
                )

            default:
                return 0
        }
    })
}

function compararValorPreferido(
    valorA: string,
    valorB: string,
    preferencia: string,
): number {
    if (valorA === valorB) {
        return 0
    }

    if (valorA === preferencia) {
        return -1
    }

    if (valorB === preferencia) {
        return 1
    }

    return 0
}

function compararFecha(
    tareaA: Tarea,
    tareaB: Tarea,
    preferencia: PreferenciaOrden,
): number {
    if (!tareaA.fechaLimite && !tareaB.fechaLimite) {
        return 0
    }

    if (!tareaA.fechaLimite) {
        return 1
    }

    if (!tareaB.fechaLimite) {
        return -1
    }

    const comparacion = tareaA.fechaLimite.localeCompare(
        tareaB.fechaLimite,
    )

    return preferencia === "LEJANA"
        ? -comparacion
        : comparacion
}