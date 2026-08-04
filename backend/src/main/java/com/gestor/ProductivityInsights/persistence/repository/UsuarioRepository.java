package com.gestor.ProductivityInsights.persistence.repository;

import com.gestor.ProductivityInsights.persistence.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByNombre(String username);

    boolean existsByCorreo(String correo);
    Optional<Usuario> findByCorreo(String correo);
}
