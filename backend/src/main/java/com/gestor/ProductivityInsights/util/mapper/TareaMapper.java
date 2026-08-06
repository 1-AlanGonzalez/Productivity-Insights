package com.gestor.ProductivityInsights.util.mapper;

import com.gestor.ProductivityInsights.persistence.model.Tarea;
import com.gestor.ProductivityInsights.presentation.dto.TareaRequestDTO;



// La clase Mapper tiene un método estático toDTO que toma un objeto Tarea y lo convierte en un objeto TareaRequestDTO.
// El método toDTO verifica si el objeto Tarea es nulo. Si lo es, devuelve nulo. Si no, 
// crea un nuevo objeto TareaRequestDTO utilizando el patrón Builder y copia los valores de id, titulo y descripcion desde el objeto Tarea al DTO. 
// Esto permite que la aplicación pueda enviar datos de tareas de manera segura y estructurada a otras capas o servicios sin exponer directamente la entidad Tarea.
// El patrón Builder es un diseño de patrón que permite construir objetos complejos paso a paso. 
// En este caso, se utiliza para crear una instancia de TareaRequestDTO de manera controlada y segura.
public class TareaMapper {

     public static TareaRequestDTO toDTO(Tarea tarea) {
          if (tarea == null) {
              return null;
          }

          return TareaRequestDTO.builder()
                  .id(tarea.getId())
                  .titulo(tarea.getTitulo())
                  .descripcion(tarea.getDescripcion())
                  .prioridad(tarea.getPrioridad())
                  .categoria(tarea.getCategoria())
                  .estado(tarea.getEstado())
                  .fechaCreacion(tarea.getFechaCreacion())
                  .fechaLimite(tarea.getFechaLimite())
                  .fechaCompletada(tarea.getFechaCompletada())
                  .horaCompletada(tarea.getHoraCompletada())
                  .idUsuario(obtenerIdUsuario(tarea))
                  .build();
      }

      private static Long obtenerIdUsuario(Tarea tarea) {
          if (tarea.getUsuario() == null) {
              return null;
          }
        return tarea.getUsuario().getId();
      }
}
