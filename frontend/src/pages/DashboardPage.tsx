
import { useEffect, useState } from "react"
import type {Estado, Prioridad, Tarea, } from "../types/Tarea"
import EditarTareaForm from "../components/EditarTareaForm"
import FiltrosTareas from "../components/FiltrosTareas"

    

function DashboardPage() {
    const [tareas, setTareas] = useState<Tarea[]>([]) // Estado para almacenar las tareas obtenidas del backend
    const [cargando, setCargando] = useState(true) // Estado para indicar si las tareas se están cargando
    const [error, setError] = useState("") // Estado para almacenar cualquier mensaje de error al cargar las tareas
    const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null)

     const [busqueda, setBusqueda] = useState("")
    const [prioridad, setPrioridad] = useState<Prioridad | "">("")
    const [estado, setEstado] = useState<Estado | "">("")

    useEffect(() => {
        // método asíncrono para cargar las tareas desde el backend
      async function cargarTareas() {
          try {
              const response = await fetch("/api/tarea", { // Se realiza una solicitud GET a la ruta del backend para obtener las tareas
                  credentials: "include",
              })

              if (!response.ok) {
                  throw new Error("No fue posible obtener las tareas")
              }

              const datos: Tarea[] = await response.json() // Se parsea la respuesta JSON a un array de tareas
              setTareas(datos)
          } catch {
              setError("No fue posible cargar las tareas")
          } finally {
              setCargando(false)
          }
      }

      cargarTareas()
    }, [])

        const tareasFiltradas = tareas.filter((tarea) => {
        const textoBuscado = busqueda.trim().toLowerCase()

        const coincideBusqueda =
            tarea.titulo.toLowerCase().includes(textoBuscado)
            || (tarea.descripcion ?? "")
                .toLowerCase()
                .includes(textoBuscado)

        const coincidePrioridad =
            prioridad === ""
            || tarea.prioridad === prioridad

        const coincideEstado =
            estado === ""
            || tarea.estado === estado

        return (
            coincideBusqueda
            && coincidePrioridad
            && coincideEstado
        )
    })

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
            <FiltrosTareas
                busqueda={busqueda}
                prioridad={prioridad}
                estado={estado}
                onBusquedaChange={setBusqueda}
                onPrioridadChange={setPrioridad}
                onEstadoChange={setEstado}
            />
                    {tareaEditando && (
                        <EditarTareaForm
                            key={tareaEditando.id}
                            tarea={tareaEditando}
                            onCancelar={() => setTareaEditando(null)}
                            onActualizada={(tareaActualizada) => {
                                setTareas((tareasActuales) =>
                                    tareasActuales.map((tarea) =>
                                        tarea.id === tareaActualizada.id
                                            ? tareaActualizada
                                            : tarea))

                                setTareaEditando(null)
                            }}/>)}

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
                {cargando && <p>Cargando tareas...</p>}

                {error && <p role="alert">{error}</p>}

                {!cargando && !error && tareas.length === 0 && (
                    <p>No hay tareas para mostrar.</p>
                )}

                {!cargando
                    && !error
                    && tareas.length > 0
                    && tareasFiltradas.length === 0 && (
                        <p>No hay tareas que coincidan con los filtros.</p>
                )}

                {!cargando && !error && tareasFiltradas.map((tarea) => (
                    <div key={tarea.id}>
                        <h3>{tarea.titulo}</h3>
                        <p>{tarea.descripcion}</p>
                        <button type="button" onClick={() => setTareaEditando(tarea)}>
                            Editar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    
        
    
        )
    }

export default DashboardPage