package com.gestor.ProductivityInsights.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.sql.Time;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TareaRequestDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private TipoPrioridad prioriad;
    private TipoCategoria categoria;
    private TipoEstado estado;
    private LocalDate fechaCreacion;
    private LocalDate fechaLimite;
    private LocalDate fechaCompletado;
    private Time horaCompletada;
    private Long idUsuario;
}
