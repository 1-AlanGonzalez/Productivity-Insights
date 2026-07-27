package com.gestor.ProductivityInsights.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.sql.Time;

import com.gestor.ProductivityInsights.enums.Estado;
import com.gestor.ProductivityInsights.enums.Prioridad;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TareaRequestDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Prioridad prioriad;
    private String categoria;
    private Estado estado;
    private LocalDate fechaCreacion;
    private LocalDate fechaLimite;
    private LocalDate fechaCompletado;
    private LocalTime horaCompletada;
    private Long idUsuario;
}
