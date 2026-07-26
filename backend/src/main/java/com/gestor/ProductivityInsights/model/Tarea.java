package com.gestor.ProductivityInsights.model;

import com.gestor.ProductivityInsights.enums.Estado;
import com.gestor.ProductivityInsights.enums.Prioridad;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.FetchType;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "tarea")
public class Tarea {
    // Tarea representa una tarea en el sistema

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TAREA")
    private Long id; // Identificador único de la tarea

    @Column(name = "TITULO", nullable = false, length = 100)
    private String titulo; // Nombre de la tarea

    @Column(name = "DESCRIPCION", nullable = true, length = 500)
    private String descripcion; // Descripción de la tarea (opcional)

    @Column(name = "PRIORIDAD")
    @Enumerated(EnumType.STRING) 
    // Enumerated: Indica que el atributo es un enumerado y se almacenará como string en la base de datos
    private Prioridad prioridad; // Prioridad de la tarea (Alta, Media, Baja)

    @Column(name = "CATEGORIA", nullable = true, length = 50)
    private String categoria; // Categoría de la tarea (opcional)

    @Column(name = "ESTADO")
    @Enumerated(EnumType.STRING)
    private Estado estado; // Estado de la tarea (Pendiente, Completada)

    @Column(name = "FECHA_CREACION", nullable = false)
    private LocalDate fechaCreacion; // Fecha de creación de la tarea

    @Column(name = "FECHA_LIMITE", nullable = true)
    private LocalDate fechaLimite; // Fecha límite para completar la tarea (opcional)

    @Column(name = "FECHA_COMPLETADA", nullable = true)
    private LocalDate fechaCompletada; // Fecha en que se completó la tarea (opcional)

    @Column(name = "HORA_COMPLETADA", nullable = true)
    private LocalTime horaCompletada; // Hora en que se completó la tarea (opcional)

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario; // Identificador del usuario al que pertenece la tarea

    // Constructor vacío requerido por JPA
    public Tarea() {}

    // Constructor con parámetros para crear una tarea 
    public Tarea(String titulo, String descripcion, Prioridad prioridad, String categoria,
                  LocalDate fechaLimite, Usuario usuario) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.categoria = categoria;
        this.fechaLimite = fechaLimite;
        this.usuario = usuario;
    }

    // Getters
    
    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Prioridad getPrioridad() {
        return prioridad;
    }

    public String getCategoria() {
        return categoria;
    }

    public Estado getEstado() {
        return estado;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public LocalDate getFechaLimite() {
        return fechaLimite;
    }

    public LocalDate getFechaCompletada() {
        return fechaCompletada;
    }

    public LocalTime getHoraCompletada() {
        return horaCompletada;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    // Setters

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setPrioridad(Prioridad prioridad) {
        this.prioridad = prioridad;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public void setFechaLimite(LocalDate fechaLimite) {
        this.fechaLimite = fechaLimite;
    }

    public void setFechaCompletada(LocalDate fechaCompletada) {
        this.fechaCompletada = fechaCompletada;
    }

    public void setHoraCompletada(LocalTime horaCompletada) {
        this.horaCompletada = horaCompletada;
    }
}
