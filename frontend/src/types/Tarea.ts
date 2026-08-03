export type Prioridad = "ALTA" | "MEDIA" | "BAJA"

export type Estado = "PENDIENTE" | "COMPLETADA"

export interface Tarea {
    id: number
    titulo: string
    descripcion: string | null
    prioridad: Prioridad
    categoria: string | null
    estado: Estado
    fechaCreacion: string
    fechaLimite: string | null
    fechaCompletada: string | null
    horaCompletada: string | null
    idUsuario: number
}