import { Tarea } from "../types/Tarea";

interface TareaCardProps {
    tarea: Tarea;
    onEditar: (tarea: Tarea) => void;
    onEliminar: (id: number) => void;
}


function TareaCard({
    tarea,
    onEditar,
    onEliminar,
}: TareaCardProps) {

    return (
        <div>

            <h3>{tarea.titulo}</h3>

            <p>{tarea.descripcion}</p>

            <button
                onClick={() => onEditar(tarea)}
            >
                Editar
            </button>

            <button
                onClick={() => onEliminar(tarea.id)}
            >
                Eliminar
            </button>

        </div>
    );
}

export default TareaCard;