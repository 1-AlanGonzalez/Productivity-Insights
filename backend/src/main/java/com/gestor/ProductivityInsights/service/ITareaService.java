package com.gestor.ProductivityInsights.service;
import java.util.List;
import com.gestor.ProductivityInsights.dto.TareaRequestDTO;

public interface ITareaService {
    List<TareaRequestDTO> traerTareas();
    TareaRequestDTO crearTarea(TareaRequestDTO tareaRequestDTO);
    TareaRequestDTO actualizarTarea(Long id, TareaRequestDTO tareaRequestDTO);
    void eliminarTarea(Long id);
}
