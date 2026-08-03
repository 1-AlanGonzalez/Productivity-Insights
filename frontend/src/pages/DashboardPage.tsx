import { useState } from "react"

function DashboardPage() {
    const [tarea,setTarea] = useState({
        titulo: "",
        descripcion: "",
        prioridad: "",
        categoria: "",
        fechaLimite: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTarea(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/tarea", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tarea)
            });

            let tareaCreada = null;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                tareaCreada = await response.json();
            }

            if (response.ok) {
                console.log("Tarea creada correctamente");
                console.log(tareaCreada);
            } else {
                console.log("Error al crear la tarea", response.status);
                console.log(tareaCreada);
            }
        } catch (error) {
            console.error("Error de red al crear la tarea:", error);
        }
    }
    
    return(
        <div>
            <h1>Mis Tareas</h1>

            <label htmlFor="tarea">Nombre de la tarea:</label>
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
                value={tarea.descripcion}
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
                value={tarea.categoria}
                onChange={handleChange}
            />
            <label htmlFor="tareaFechaLimite">Fecha límite de la tarea:</label>
            <input
                type="date"
                id="tareaFechaLimite"
                name="fechaLimite"
                value={tarea.fechaLimite}
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>Agregar tarea</button>

            <div>
                <h3>Tarea de ejemplo</h3>

                <button>Editar</button>

                <button>Eliminar</button>
            </div>
        </div>
    
        
    
    )
}

export default DashboardPage