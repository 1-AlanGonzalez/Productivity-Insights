package com.gestor.ProductivityInsights.service.implementation;

import com.gestor.ProductivityInsights.persistence.repository.UsuarioRepository;
import com.gestor.ProductivityInsights.presentation.dto.LoginRequestDTO;
import com.gestor.ProductivityInsights.service.interfaces.ILoginService;
import org.springframework.stereotype.Service;

// Importo la interfaz de Spring Security utilizada para trabajar con contraseñas protegidas mediante hash.
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
// Pasó de ser una interfaz a ser una clase que implementa del service ILoginService
public class LoginService implements ILoginService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean login(LoginRequestDTO dto) {
        // Si el DTO viene vacío, no puede iniciar sesión
        if (dto == null
                || dto.getCorreo() == null
                || dto.getCorreo().isBlank()
                || dto.getContrasena() == null
                || dto.getContrasena().isBlank()) {
            return false;
        }
        // Si no viene vacío, buscamos al usuario mediante su correo
        // 
        return usuarioRepository.findByCorreo(dto.getCorreo().trim())
                .map(usuario -> passwordEncoder.matches(
                        dto.getContrasena(),
                        usuario.getContrasena()
                ))
                .orElse(false);
    }
}
