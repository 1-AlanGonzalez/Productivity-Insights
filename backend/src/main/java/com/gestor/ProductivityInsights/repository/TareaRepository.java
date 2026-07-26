package com.gestor.ProductivityInsights.repository;

import com.gestor.ProductivityInsights.enums.Estado;
import com.gestor.ProductivityInsights.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {

}