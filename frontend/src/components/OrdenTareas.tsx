import type { ChangeEvent } from "react"
import type {
    CriterioOrden,
    PreferenciaOrden,
} from "../utils/ordenarTareas"

interface OrdenTareasProps {
    criterio: CriterioOrden
    preferencia: PreferenciaOrden
    onCriterioChange: (criterio: CriterioOrden) => void
    onPreferenciaChange: (
        preferencia: PreferenciaOrden,
    ) => void
}

const preferenciaInicial: Record<
    CriterioOrden,
    PreferenciaOrden
> = {
    FECHA: "PROXIMA",
    PRIORIDAD: "ALTA",
    ESTADO: "PENDIENTE",
}

function OrdenTareas({
    criterio,
    preferencia,
    onCriterioChange,
    onPreferenciaChange,
}: OrdenTareasProps) {
    function handleCriterioChange(
        event: ChangeEvent<HTMLSelectElement>,
    ) {
        const nuevoCriterio =
            event.target.value as CriterioOrden

        onCriterioChange(nuevoCriterio)
        onPreferenciaChange(
            preferenciaInicial[nuevoCriterio],
        )
    }

    return (
        <div>
            <label htmlFor="criterioOrden">
                Ordenar por:
            </label>

            <select
                id="criterioOrden"
                value={criterio}
                onChange={handleCriterioChange}
            >
                <option value="FECHA">Fecha límite</option>
                <option value="PRIORIDAD">Prioridad</option>
                <option value="ESTADO">Estado</option>
            </select>

            <label htmlFor="preferenciaOrden">
                Mostrar primero:
            </label>

            <select
                id="preferenciaOrden"
                value={preferencia}
                onChange={(event) =>
                    onPreferenciaChange(
                        event.target.value as PreferenciaOrden,
                    )
                }
            >
                {criterio === "FECHA" && (
                    <>
                        <option value="PROXIMA">
                            Fecha más próxima
                        </option>
                        <option value="LEJANA">
                            Fecha más lejana
                        </option>
                    </>
                )}

                {criterio === "PRIORIDAD" && (
                    <>
                        <option value="ALTA">Alta</option>
                        <option value="MEDIA">Media</option>
                        <option value="BAJA">Baja</option>
                    </>
                )}

                {criterio === "ESTADO" && (
                    <>
                        <option value="PENDIENTE">
                            Pendientes
                        </option>
                        <option value="COMPLETADA">
                            Completadas
                        </option>
                    </>
                )}
            </select>
        </div>
    )
}

export default OrdenTareas