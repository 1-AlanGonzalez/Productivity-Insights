import type { Tarea } from "../types/Tarea";

interface EstadisticasTareasProps {
    tareas: Tarea[];
}

function EstadisticaTarea({ tareas }: EstadisticasTareasProps) {
    
    const totalTareas = tareas.length;

    const totalPendientes = tareas.filter((t) => t.estado === "PENDIENTE").length;

    const totalCompletadas = tareas.filter((t) => t.estado === "COMPLETADA").length;

    const hoy = new Date().toISOString().split("T")[0]; 
    // Obtener la fecha actual en formato YYYY-MM-DD, toISOString() devuelve la fecha en formato UTC, por lo que se divide en "T" y se toma la primera parte para obtener solo la fecha.
    // UTC es un estándar de tiempo que no depende de la zona horaria local, por lo que es útil para comparar fechas sin preocuparse por las diferencias de zona horaria.
    // split(T)[0] toma la primera parte de la cadena resultante de toISOString(), que es la fecha en formato YYYY-MM-DD, y la asigna a la variable hoy.
    
    const totalVencidas = tareas.filter((t) => t.fechaLimite && t.fechaLimite < hoy && t.estado !== "COMPLETADA").length;

    return (
        <div>
            <h2>Estadísticas</h2>
            <p><strong>Total de tareas:</strong> {totalTareas}</p>
            <p><strong>Tareas pendientes:</strong> {totalPendientes}</p>
            <p><strong>Tareas completadas:</strong> {totalCompletadas}</p>
            <p><strong>Tareas vencidas:</strong> {totalVencidas}</p>
        </div>
    );
}

export default EstadisticaTarea