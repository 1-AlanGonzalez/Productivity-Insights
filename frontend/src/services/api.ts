export async function manejarRespuestas(response : Response) {
    if(response.ok) return response

    switch(response.status) {
        case 400:
            throw new Error("Los datos enviados no son válidos")
        case 401:
            throw new Error("Tu sesión no es válida o ha expirado")
        case 403:
            throw new Error("No tienes permisos para realizar esta acción")
        case 404:
            throw new Error("No se encontró el recurso solicitado")
        case 500:
            throw new Error("Ocurrió un error en el servidor")
        default:
            throw new Error("Ocurrió un error desconocido")
    }
}