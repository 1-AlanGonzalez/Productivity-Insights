
function DashboardPage() {
    
    return(
        <div>
            <h1>Mis Tareas</h1>

            <label htmlFor="taskName">Nombre de la tarea:</label>
            <input type="text" id="taskName" placeholder="nombre de la tarea" />
            <label htmlFor="taskDescription">Descripción de la tarea:</label>
            <textarea id="taskDescription" placeholder="descripción de la tarea"></textarea>

            <button>Agregar tarea</button>

            <div>
                <h3>Tarea de ejemplo</h3>

                <button>Editar</button>

                <button>Eliminar</button>
            </div>
        </div>
    
        
    
    )
}

export default DashboardPage