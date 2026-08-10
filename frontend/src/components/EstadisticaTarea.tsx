import { ResponsivePie } from "@nivo/pie"
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

    const datosGrafico = [
        { id: "Completadas", value: totalCompletadas },
        { id: "Pendientes", value: totalPendientes },
    ]

    return (
        <div>
            <h2>Estadísticas</h2>
            <p><strong>Total de tareas:</strong> {totalTareas}</p>
            <p><strong>Tareas pendientes:</strong> {totalPendientes}</p>
            <p><strong>Tareas completadas:</strong> {totalCompletadas}</p>
            <p><strong>Tareas vencidas:</strong> {totalVencidas}</p>

            {totalTareas > 0 && (
                <div style={{ height: 300 }}>
                    <ResponsivePie
                        data={datosGrafico}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={1}
                        cornerRadius={4}
                        activeOuterRadiusOffset={8}
                        colors={{ scheme: "set2" }}
                        borderWidth={1}
                        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#e5e5e5"
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor="#1a1a1a"
                        legends={[
                            {
                                anchor: "bottom",
                                direction: "row",
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: "#e5e5e5",
                                symbolShape: "circle",
                            },
                        ]}
                    />
                </div>
            )}
        </div>
    );
}

export default EstadisticaTarea