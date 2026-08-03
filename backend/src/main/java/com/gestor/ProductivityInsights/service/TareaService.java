package com.gestor.ProductivityInsights.service;
import com.gestor.ProductivityInsights.dto.TareaRequestDTO;
import com.gestor.ProductivityInsights.exception.BusinessException;
import com.gestor.ProductivityInsights.mapper.Mapper;
import com.gestor.ProductivityInsights.model.Tarea;
import com.gestor.ProductivityInsights.model.Usuario;
import com.gestor.ProductivityInsights.repository.TareaRepository;
import com.gestor.ProductivityInsights.repository.UsuarioRepository;

import java.util.List;
import java.time.LocalDate;

import org.springframework.stereotype.Service;

@Service
public class TareaService implements ITareaService {
    private TareaRepository tareaRepository;
    private UsuarioRepository usuarioRepository;

    public TareaService(TareaRepository tareaRepository, UsuarioRepository usuarioRepository) {
        this.tareaRepository = tareaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public List<TareaRequestDTO> traerTareas() {
        // Implementación del método para traer tareas
        return null;
    }

    @Override
    public TareaRequestDTO crearTarea(TareaRequestDTO tareaRequestDTO) {

    if (tareaRequestDTO == null) {
        throw new BusinessException("Request is null");
    }

    if (tareaRequestDTO.getTitulo() == null || tareaRequestDTO.getTitulo().isBlank()) {
        throw new BusinessException("Title is required");
    }

    if (tareaRequestDTO.getDescripcion() == null || tareaRequestDTO.getDescripcion().isBlank()) {
        throw new BusinessException("Description is required");
    }

    if (tareaRequestDTO.getPrioridad() == null) {
        throw new BusinessException("Priority is required");
    }

     Usuario usuarioDefault = usuarioRepository.findById(1L) // va a buscar el usuario con id 1, que es el usuario de prueba
                .orElseThrow(() -> new BusinessException("Usuario de prueba con id 1 no existe"));
    Tarea tarea = Tarea.builder()
            .titulo(tareaRequestDTO.getTitulo())
            .descripcion(tareaRequestDTO.getDescripcion())
            .prioridad(tareaRequestDTO.getPrioridad()) 
            .categoria(tareaRequestDTO.getCategoria())
            .fechaCreacion(LocalDate.now())
            .fechaLimite(tareaRequestDTO.getFechaLimite())
            .usuario(usuarioDefault)
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
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new BusinessException("la tarea con id: " + id + " no fue encontrada"));
        // if(tarea.getEstado().equals("completada")){
        //     throw new BusinessException("la tarea con id: " + id + " ya fue completada y no puede ser eliminada");
        // }
        tareaRepository.delete(tarea);
    }
}
