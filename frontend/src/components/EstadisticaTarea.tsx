import { ResponsivePie } from "@nivo/pie"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line"
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

    // Fecha actual para comparar con la fecha de creación
    const fechaActual = new Date()
    const mesActual = fechaActual.getMonth()
    const anioActual = fechaActual.getFullYear()

    // Filtra las tareas creadas en el mes actual usando el timestamp (Date.now())
    const totalTareas = tareas.filter((tarea) => {
        if (!tarea.fechaCreacion) return false

        const fechaCreacionTarea = new Date(tarea.fechaCreacion)

        return (
            fechaCreacionTarea.getMonth() === mesActual &&
            fechaCreacionTarea.getFullYear() === anioActual
        )
    }).length

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

    // Agrupación por mes de CREACIÓN en lugar de fecha límite
    const tareasPorMes = tareas.reduce(
        (acumulador, tarea) => {
            if (!tarea.fechaCreacion) {
                return acumulador
            }

            const fecha = new Date(tarea.fechaCreacion)
            const anio = fecha.getFullYear()
            const mesNumero = String(fecha.getMonth() + 1).padStart(2, "0")
            const clave = `${anio}-${mesNumero}`

            acumulador[clave] = (acumulador[clave] || 0) + 1

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

    const datosPorMesLine = [
        {
            id: "Tareas",
            data: Object.entries(tareasPorMes).map(([clave, cantidad]) => ({
                x: nombresMeses[clave.substring(5, 7)],
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
                    <span>Tareas de este mes</span>
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

            {tareas.length > 0 ? (

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
                            <h3>Tareas creadas por mes</h3>
                            <p>
                                Cantidad de tareas creadas según cada mes.
                            </p>
                        </div>

                        {hayDatosDeMeses ? (

                            <div className="estadisticas__grafico-contenido">
                                <ResponsiveLine
                                    data={datosPorMesLine}
                                    {...configuracionGraficoMes}
                                />
                            </div>

                        ) : (

                            <div className="estadisticas__sin-datos">
                                <p>
                                    No hay tareas creadas para mostrar.
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