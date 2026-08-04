package com.gestor.ProductivityInsights.presentation.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.gestor.ProductivityInsights.persistence.model.enums.Estado;
import com.gestor.ProductivityInsights.persistence.model.enums.Prioridad;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class TareaRequestDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Prioridad prioridad;
    private String categoria;
    private LocalDate fechaLimite;
    private Estado estado;
    private LocalDate fechaCreacion;
    private LocalDate fechaCompletada;
    private LocalTime horaCompletada;
    private Long idUsuario;
// 
}
