package com.gestor.ProductivityInsights.persistence.repository;
import java.util.List;
import java.util.Optional;

import com.gestor.ProductivityInsights.persistence.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepository extends JpaRepository<Tarea, Long> {

    List<Tarea> findByUsuario_Correo(String correo);

    Optional<Tarea> findByIdAndUsuario_Correo(Long id, String correo);
}
