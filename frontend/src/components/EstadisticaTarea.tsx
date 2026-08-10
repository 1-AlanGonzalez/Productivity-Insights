import { ResponsivePie } from "@nivo/pie"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line" // 1. Nuevo import
import type { Tarea } from "../types/Tarea"
import { estaVencida } from "../utils/estadoTarea"
import {
    configuracionGraficoEstado,
    configuracionGraficoPrioridad,
    configuracionGraficoMes,
} from "../services/estadisticaGrafico"
import "../styles/components/EstadisticaTarea.css"

interface EstadisticasTareasProps {
    tareas: Tarea[]
}

function EstadisticaTarea({ tareas }: EstadisticasTareasProps) {

    const totalTareas = tareas.length

    const totalPendientes = tareas.filter(
        (tarea) => tarea.estado === "PENDIENTE"
    ).length

    const totalCompletadas = tareas.filter(
        (tarea) => tarea.estado === "COMPLETADA"
    ).length

    const totalVencidas = tareas.filter(
        (tarea) => estaVencida(tarea)
    ).length

    const datosEstado = [
        { id: "Completadas", value: totalCompletadas },
        { id: "Pendientes", value: totalPendientes },
    ]

    const datosPrioridad = [
        {
            prioridad: "Alta",
            cantidad: tareas.filter(
                (tarea) => tarea.prioridad === "ALTA"
            ).length,
        },
        {
            prioridad: "Media",
            cantidad: tareas.filter(
                (tarea) => tarea.prioridad === "MEDIA"
            ).length,
        },
        {
            prioridad: "Baja",
            cantidad: tareas.filter(
                (tarea) => tarea.prioridad === "BAJA"
            ).length,
        },
    ]

    const tareasPorMes = tareas.reduce(
        (acumulador, tarea) => {
            if (!tarea.fechaLimite) {
                return acumulador
            }

            const mes = tarea.fechaLimite.substring(0, 7)

            acumulador[mes] = (acumulador[mes] || 0) + 1

            return acumulador
        },
        {} as Record<string, number>
    )

    const nombresMeses: Record<string, string> = {
        "01": "Enero",
        "02": "Febrero",
        "03": "Marzo",
        "04": "Abril",
        "05": "Mayo",
        "06": "Junio",
        "07": "Julio",
        "08": "Agosto",
        "09": "Septiembre",
        "10": "Octubre",
        "11": "Noviembre",
        "12": "Diciembre",
    }

    // 2. Formateo de datos compatible con @nivo/line (estructura de series con 'x' e 'y')
    const datosPorMesLine = [
        {
            id: "Tareas",
            data: Object.entries(tareasPorMes).map(([mes, cantidad]) => ({
                x: nombresMeses[mes.substring(5, 7)],
                y: cantidad,
            })),
        },
    ]

    const hayDatosDeMeses = datosPorMesLine[0].data.length > 0

    return (
        <section className="estadisticas">

            <div className="estadisticas__encabezado">
                <p className="estadisticas__etiqueta">
                    PRODUCTIVITY INSIGHTS
                </p>

                <h2>Resumen de tareas</h2>

                <p className="estadisticas__descripcion">
                    Consultá rápidamente el estado, la prioridad y la
                    distribución de tus tareas.
                </p>
            </div>

            <div className="estadisticas__resumen">

                <div className="estadisticas__tarjeta">
                    <span>Total de tareas</span>
                    <strong>{totalTareas}</strong>
                </div>

                <div className="estadisticas__tarjeta">
                    <span>Pendientes</span>
                    <strong>{totalPendientes}</strong>
                </div>

                <div className="estadisticas__tarjeta">
                    <span>Completadas</span>
                    <strong>{totalCompletadas}</strong>
                </div>

                <div className="estadisticas__tarjeta">
                    <span>Vencidas</span>
                    <strong>{totalVencidas}</strong>
                </div>

            </div>

            {totalTareas > 0 ? (

                <div className="estadisticas__graficos">

                    <article className="estadisticas__grafico">

                        <div className="estadisticas__grafico-header">
                            <h3>Estado de las tareas</h3>
                            <p>
                                Comparación entre tareas pendientes y
                                completadas.
                            </p>
                        </div>

                        <div className="estadisticas__grafico-contenido">
                            <ResponsivePie
                                data={datosEstado}
                                {...configuracionGraficoEstado}
                            />
                        </div>

                    </article>


                    <article className="estadisticas__grafico">

                        <div className="estadisticas__grafico-header">
                            <h3>Tareas por prioridad</h3>
                            <p>
                                Distribución de tareas según su nivel de
                                prioridad.
                            </p>
                        </div>

                        <div className="estadisticas__grafico-contenido">
                            <ResponsiveBar
                                data={datosPrioridad}
                                keys={["cantidad"]}
                                indexBy="prioridad"
                                {...configuracionGraficoPrioridad}
                            />
                        </div>

                    </article>


                    <article className="estadisticas__grafico estadisticas__grafico--amplio">

                        <div className="estadisticas__grafico-header">
                            <h3>Tareas por mes</h3>
                            <p>
                                Cantidad de tareas según el mes de su fecha
                                límite.
                            </p>
                        </div>

                        {hayDatosDeMeses ? (

                            <div className="estadisticas__grafico-contenido">
                                {/* 3. Uso del componente ResponsiveLine */}
                                <ResponsiveLine
                                    data={datosPorMesLine}
                                    {...configuracionGraficoMes}
                                />
                            </div>

                        ) : (

                            <div className="estadisticas__sin-datos">
                                <p>
                                    No hay tareas con fecha límite para
                                    mostrar.
                                </p>
                            </div>

                        )}

                    </article>

                </div>

            ) : (

                <div className="estadisticas__vacio">
                    <h3>Aún no tenés tareas</h3>
                    <p>
                        Creá tu primera tarea para comenzar a ver tus
                        estadísticas.
                    </p>
                </div>

            )}

        </section>
    )
}

export default EstadisticaTarea