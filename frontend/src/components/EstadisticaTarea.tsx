import type { Tarea } from "../types/Tarea";
import { estaVencida } from "../utils/estadoTarea"

interface EstadisticasTareasProps {
    tareas: Tarea[];
}

function EstadisticaTarea({ tareas }: EstadisticasTareasProps) {
    
    const totalTareas = tareas.length;

    const totalPendientes = tareas.filter((t) => t.estado === "PENDIENTE").length;

    const totalCompletadas = tareas.filter((t) => t.estado === "COMPLETADA").length;

    const totalVencidas = tareas.filter((tarea) => estaVencida(tarea), ).length

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