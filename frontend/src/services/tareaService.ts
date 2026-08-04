import { Tarea, TareaEditable } from "../types/Tarea"

export async function obtenerTareas(): Promise<Tarea[]> {
    const response = await fetch("/api/tarea", {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("No fue posible obtener las tareas")
    }

    return response.json()
}

export async function crearTarea(datos: Partial<Tarea>): Promise<Tarea> {
    const response = await fetch("/api/tarea", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    if (!response.ok) {
        throw new Error("No fue posible crear la tarea");
    }

    return response.json();
}

export async function actualizarTarea(
    id: number,
    datos: TareaEditable
): Promise<Tarea> {
    const response = await fetch(`/api/tarea/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
    });

    if (!response.ok) {
        throw new Error("No fue posible actualizar la tarea");
    }

    return response.json();
}

export async function eliminarTarea(id: number): Promise<void> {
    const response = await fetch(`/api/tarea/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("No fue posible eliminar la tarea");
    }
}