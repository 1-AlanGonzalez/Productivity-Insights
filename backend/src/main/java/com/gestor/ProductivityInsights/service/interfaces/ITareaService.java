package com.gestor.ProductivityInsights.service.interfaces;
import java.util.List;
import com.gestor.ProductivityInsights.presentation.dto.TareaRequestDTO;

public interface ITareaService {
    List<TareaRequestDTO> traerTareas(String correoUsuario);
    TareaRequestDTO crearTarea(TareaRequestDTO tareaRequestDTO, String correoUsuario);
    TareaRequestDTO actualizarTarea(Long id, TareaRequestDTO tareaRequestDTO, String correoUsuario);
    void eliminarTarea(Long id, String correoUsuario);
}
