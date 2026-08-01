package com.gestor.ProductivityInsights.mapper;

import com.gestor.ProductivityInsights.dto.TareaRequestDTO;
import com.gestor.ProductivityInsights.model.Tarea;



// La clase Mapper tiene un método estático toDTO que toma un objeto Tarea y lo convierte en un objeto TareaRequestDTO.
// El método toDTO verifica si el objeto Tarea es nulo. Si lo es, devuelve nulo. Si no, 
// crea un nuevo objeto TareaRequestDTO utilizando el patrón Builder y copia los valores de id, titulo y descripcion desde el objeto Tarea al DTO. 
// Esto permite que la aplicación pueda enviar datos de tareas de manera segura y estructurada a otras capas o servicios sin exponer directamente la entidad Tarea.
// El patrón Builder es un diseño de patrón que permite construir objetos complejos paso a paso. 
// En este caso, se utiliza para crear una instancia de TareaRequestDTO de manera controlada y segura.
public class Mapper {
    public static TareaRequestDTO toDTO (Tarea tarea){
        if(tarea == null) return null;
        return TareaRequestDTO.builder()
                .id(tarea.getId())
                .titulo(tarea.getTitulo())
                .descripcion(tarea.getDescripcion())
                .build();   
    }
}
