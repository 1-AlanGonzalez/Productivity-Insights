import { useState, type FormEvent } from "react"
import type { Tarea } from "../types/Tarea"
import { actualizarTarea } from "../services/tareaService"

interface EditarTareaFormProps {
    tarea: Tarea
    onCancelar: () => void
    onActualizada: (tarea: Tarea) => void
}

function EditarTareaForm({tarea, onCancelar, onActualizada,}: EditarTareaFormProps) {
    const [formulario, setFormulario] = useState<Tarea>(tarea)
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState("")

    async function guardarCambios(
      event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setGuardando(true)
        setError("")

        try {
            const tareaActualizada = await actualizarTarea(formulario.id, {
                titulo: formulario.titulo,
                descripcion: formulario.descripcion,
                prioridad: formulario.prioridad,
                categoria: formulario.categoria,
                estado: formulario.estado,
                fechaLimite: formulario.fechaLimite,
            })

            onActualizada(tareaActualizada)
        } catch (errorActual) {
            setError(
                errorActual instanceof Error
                    ? errorActual.message
                    : "No fue posible actualizar la tarea"
            )
        } finally {
            setGuardando(false)
        }
    }
    return (
        <form onSubmit={guardarCambios}>
            <h2>Editar tarea</h2>

            <label htmlFor="editTaskName">
                Nombre de la tarea:
            </label>

            <input
                id="editTaskName"
                type="text"
                required
                value={formulario.titulo}
                maxLength={100}
                onChange={(event) =>
                    setFormulario({
                        ...formulario,
                        titulo: event.target.value,
                    })
                }
            />

            <label htmlFor="editTaskDescription">
                Descripción:
            </label>

            <textarea
                id="editTaskDescription"
                value={formulario.descripcion ?? ""}
                maxLength={500}
                onChange={(event) =>
                    setFormulario({...formulario, descripcion: event.target.value,})}/>
            <label htmlFor="editTaskPriority">
                Prioridad:
            </label>

            <select
                id="editTaskPriority"
                value={formulario.prioridad}
                onChange={(event) =>
                    setFormulario({
                        ...formulario,
                        prioridad: event.target.value as Tarea["prioridad"],
                    })
                }
            >
                <option value="ALTA">Alta</option>
                <option value="MEDIA">Media</option>
                <option value="BAJA">Baja</option>
            </select>

            <label htmlFor="editTaskCategory">
                Categoría:
            </label>

            <input
                id="editTaskCategory"
                type="text"
                value={formulario.categoria ?? ""}
                maxLength={50}
                onChange={(event) =>
                    setFormulario({
                        ...formulario,
                        categoria: event.target.value || null,
                    })
                }
            />

            <label htmlFor="editTaskStatus">
                Estado:
            </label>

            <select
                id="editTaskStatus"
                value={formulario.estado}
                onChange={(event) =>
                    setFormulario({
                        ...formulario,
                        estado: event.target.value as Tarea["estado"],
                    })
                }
            >
                <option value="PENDIENTE">Pendiente</option>
                <option value="COMPLETADA">Completada</option>
            </select>

            <label htmlFor="editTaskDeadline">
                Fecha límite:
            </label>

            <input
                id="editTaskDeadline"
                type="date"
                value={formulario.fechaLimite ?? ""}
                onChange={(event) =>
                    setFormulario({
                        ...formulario,
                        fechaLimite: event.target.value || null,
                    })
                }
            />
            {error && <p role="alert">{error}</p>}

            <button type="submit" disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
             <button type="button" onClick={onCancelar} disabled={guardando}>
                Cancelar
            </button>
        </form>
    )
}

export default EditarTareaForm