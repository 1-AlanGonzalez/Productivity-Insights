package com.gestor.ProductivityInsights.service;
import com.gestor.ProductivityInsights.dto.TareaRequestDTO;
import com.gestor.ProductivityInsights.exception.BusinessException;
import com.gestor.ProductivityInsights.mapper.Mapper;
import com.gestor.ProductivityInsights.model.Tarea;
import com.gestor.ProductivityInsights.repository.TareaRepository;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TareaService implements ITareaService {
    private TareaRepository tareaRepository;

    public TareaService(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    @Override
    public List<TareaRequestDTO> traerTareas() {
        // Implementación del método para traer tareas
        return null;
    }

    @Override
    public TareaRequestDTO crearTarea(TareaRequestDTO tareaRequestDTO) {
        if(tareaRequestDTO == null) return null;
        if(tareaRequestDTO.getTitulo().isBlank()){
            throw new BusinessException("Title is required");
        }
        if(tareaRequestDTO.getDescripcion().isBlank()){
            throw new BusinessException("Description is required");
        }
        Tarea tarea = Tarea.builder()
                .titulo(tareaRequestDTO.getTitulo())
                .descripcion(tareaRequestDTO.getDescripcion())
                .build();
        return Mapper.toDTO(tareaRepository.save(tarea));
    }

    @Override
    public TareaRequestDTO actualizarTarea(Long id, TareaRequestDTO tareaRequestDTO) {
        // Implementación del método para actualizar una tarea
        return null;
    }

    @Override
    public void eliminarTarea(Long id) {
        // Implementación del método para eliminar una tarea
    }
}
