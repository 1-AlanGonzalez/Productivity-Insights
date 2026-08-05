import { useState } from "react";
import { Tarea } from "../types/Tarea";
import { crearTarea } from "../services/tareaService";
import "../styles/components/TareaForm.css";


type CrearTareaFormProps = {
    onTareaCreada: (tarea: Tarea) => void;
}

function CrearTareaForm({ onTareaCreada }: CrearTareaFormProps) {

    const tareaInicial: Partial<Tarea> = {
        titulo: "",
        descripcion: "",
        prioridad: "",
        categoria: "",
        fechaLimite: ""
    };
    const [tarea, setTarea] = useState(tareaInicial);
    const [error, setError] = useState("");
    const [creando, setCreando] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTarea(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setCreando(true);
        setError("");

        try {
            const tareaCreada = await crearTarea(tarea);
            onTareaCreada(tareaCreada);
            setTarea(tareaInicial);
        } catch (errorActual) {
            setError(
                errorActual instanceof Error
                    ? errorActual.message
                    : "No fue posible crear la tarea"
            );
        } finally {
            setCreando(false);
        }
    }

    return(
        <div className="task-form"><h2>Nueva tarea</h2><label htmlFor="tarea">Nombre de la tarea:</label>
            <input type="text" 
                id="tarea" 
                name="titulo"
                placeholder="nombre de la tarea" 
                value={tarea.titulo}
                onChange={handleChange}
            />
            <label htmlFor="tareaDescripcion">Descripción de la tarea:</label>
            <textarea 
                id="tareaDescripcion" 
                name="descripcion"
                placeholder="descripción de la tarea"
                value={tarea.descripcion ?? ""}
                onChange={handleChange}
            ></textarea>
            <label htmlFor="tareaPrioridad">Prioridad de la tarea:</label>
            <select 
                id="tareaPrioridad"
                name="prioridad"
                value={tarea.prioridad}
                onChange={handleChange}
            >
                <option value="">Seleccionar prioridad</option>
                <option value="ALTA">Alta</option>
                <option value="MEDIA">Media</option>
                <option value="BAJA">Baja</option>
            </select>
            <label htmlFor="tareaCategoria">Categoría de la tarea:</label>
            <input
                id="tareaCategoria"
                name="categoria"
                placeholder="categoría de la tarea"
                value={tarea.categoria ?? ""}
                onChange={handleChange}
            />
            <label htmlFor="tareaFechaLimite">Fecha límite de la tarea:</label>
            <input
                type="date"
                id="tareaFechaLimite"
                name="fechaLimite"
                value={tarea.fechaLimite ?? ""}
                onChange={handleChange}
            />
            {error && <p role="alert">{error}</p>}
            <button className="task-form__submit" onClick={handleSubmit} disabled={creando}>
                {creando ? "Agregando..." : "Agregar tarea"}
            </button>
    
    </div>
    )
}

export default CrearTareaForm;
