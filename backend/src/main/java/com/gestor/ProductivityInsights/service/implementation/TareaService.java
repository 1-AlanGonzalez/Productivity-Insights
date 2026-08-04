package com.gestor.ProductivityInsights.service.implementation;
import com.gestor.ProductivityInsights.presentation.dto.TareaRequestDTO;
import com.gestor.ProductivityInsights.service.exception.BusinessException;
import com.gestor.ProductivityInsights.util.mapper.TareaMapper;
import com.gestor.ProductivityInsights.persistence.model.Tarea;
import com.gestor.ProductivityInsights.persistence.repository.TareaRepository;
import java.util.List;
import com.gestor.ProductivityInsights.service.exception.TareaNotFoundException;
import com.gestor.ProductivityInsights.service.interfaces.ITareaService;
import org.springframework.stereotype.Service;
import java.time.LocalTime;

import com.gestor.ProductivityInsights.persistence.model.enums.Estado;

@Service
public class TareaService implements ITareaService {
    private TareaRepository tareaRepository;
    private UsuarioRepository usuarioRepository;

    public TareaService(TareaRepository tareaRepository, UsuarioRepository usuarioRepository) {
        this.tareaRepository = tareaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public List<TareaRequestDTO> traerTareas(String correoUsuario) {
        return tareaRepository.findByUsuario_Correo(correoUsuario)
                .stream()
                .map(TareaMapper::toDTO)
                .toList();
    }

    @Override
    public TareaRequestDTO crearTarea(TareaRequestDTO tareaRequestDTO, String correoUsuario) {
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
        return TareaMapper.toDTO(tareaRepository.save(tarea));
    }

    // Actualizar tarea ==========================================================
    @Override
    public TareaRequestDTO actualizarTarea(Long id, TareaRequestDTO tareaRequestDTO, String correoUsuario) {
        Tarea tarea = buscarTarea(id, correoUsuario);

        validarDatosEdicion(tareaRequestDTO);

        Estado estadoAnterior = tarea.getEstado();

        actualizarCamposEditables(tarea, tareaRequestDTO);
        actualizarDatosDeFinalizacion(tarea, estadoAnterior, tareaRequestDTO.getEstado());

        return TareaMapper.toDTO(tareaRepository.save(tarea));
    }

    private Tarea buscarTarea(Long id, String correoUsuario) {
      return  tareaRepository
              .findByIdAndUsuario_Correo(id, correoUsuario)
              .orElseThrow(() -> new TareaNotFoundException(
                      "La tarea con id " + id + " no fue encontrada"));
    }

    private void validarDatosEdicion(TareaRequestDTO dto) {
        if (dto == null) {
            throw new BusinessException(
                    "Los datos de la tarea son obligatorios"
            );
        }

        if (dto.getTitulo() == null || dto.getTitulo().isBlank()) {
            throw new BusinessException(
                    "El titulo es obligatorio"
            );
        }

        if (dto.getTitulo().trim().length() > 100) {
            throw new BusinessException(
                    "El titulo no puede superar los 100 caracteres"
            );
        }

        if (dto.getDescripcion() != null
                && dto.getDescripcion().trim().length() > 500) {
            throw new BusinessException(
                    "La descripcion no puede superar los 500 caracteres"
            );
        }

        if (dto.getCategoria() != null
                && dto.getCategoria().trim().length() > 50) {
            throw new BusinessException(
                    "La categoria no puede superar los 50 caracteres"
            );
        }

        if (dto.getPrioridad() == null) {
            throw new BusinessException(
                    "La prioridad es obligatoria"
            );
        }

        if (dto.getEstado() == null) {
            throw new BusinessException(
                    "El estado es obligatorio"
            );
        }
    }

    private void actualizarCamposEditables(Tarea tarea, TareaRequestDTO dto) {
        tarea.setTitulo(dto.getTitulo().trim());
        tarea.setDescripcion(limpiarTextoOpcional(dto.getDescripcion()));
        tarea.setPrioridad(dto.getPrioridad());
        tarea.setCategoria(limpiarTextoOpcional(dto.getCategoria()));
        tarea.setEstado(dto.getEstado());
        tarea.setFechaLimite(dto.getFechaLimite());
    }


   // Administrar la finalización 

    private void actualizarDatosDeFinalizacion(Tarea tarea, Estado estadoAnterior, Estado estadoNuevo) {

        boolean acabaDeCompletarse = estadoAnterior != Estado.COMPLETADA && estadoNuevo == Estado.COMPLETADA;
        boolean vuelveAPendiente = estadoAnterior == Estado.COMPLETADA && estadoNuevo == Estado.PENDIENTE;

        if (acabaDeCompletarse) {
            tarea.setFechaCompletada(LocalDate.now());
            tarea.setHoraCompletada(LocalTime.now());
        }

        if (vuelveAPendiente) {
            tarea.setFechaCompletada(null);
            tarea.setHoraCompletada(null);
        }
    }

    // Fin de edición ==========================================================


    // Eliminar tarea
    @Override
    public void eliminarTarea(Long id, String correoUsuario) {
        Tarea tarea = tareaRepository.findByIdAndUsuario_Correo(id, correoUsuario)
                .orElseThrow(() -> new BusinessException("la tarea con id: " + id + " no fue encontrada"));
        // if(tarea.getEstado().equals("completada")){
        //     throw new BusinessException("la tarea con id: " + id + " ya fue completada y no puede ser eliminada");
        // }
        tareaRepository.delete(tarea);
    }
    private String limpiarTextoOpcional(String texto) {
        return texto == null ? null : texto.trim();
    }
}
