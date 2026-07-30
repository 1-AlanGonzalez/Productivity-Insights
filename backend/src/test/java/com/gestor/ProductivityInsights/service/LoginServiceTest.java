package com.gestor.ProductivityInsights.service;

import com.gestor.ProductivityInsights.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.gestor.ProductivityInsights.dto.LoginRequestDTO;
import org.junit.jupiter.api.Test;
import com.gestor.ProductivityInsights.model.Usuario;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;

class LoginServiceTest {

    private UsuarioRepository usuarioRepository;
    private PasswordEncoder passwordEncoder;
    private LoginService loginService;

    @BeforeEach
    void setUp() {
        // Creamos un repositorio simulado. 
        usuarioRepository = mock(UsuarioRepository.class);
        // Creamos un encoder simulado
        passwordEncoder = mock(PasswordEncoder.class);
        // Creamos el servicio real que queremos probar
        loginService = new LoginService(usuarioRepository, passwordEncoder);
    }

    @Test
    void devuelveFalseCuandoUsuarioNoExiste() {
        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setCorreo("correodeprueba@gmail.com");
        dto.setContrasena("1234");

        when(usuarioRepository.findByCorreo("correodeprueba@gmail.com"))
                .thenReturn(Optional.empty());
        // Cuando te pidan buscar este correo, responde que no existe ningún usuario.
        boolean resultado = loginService.login(dto);

        assertFalse(resultado);
    }

    @Test
    void devuelveFalseCuandoContrasenaEsIncorrecta() {
        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setCorreo("usuario@gmail.com");
        dto.setContrasena("contrasena-incorrecta");

        Usuario usuario = new Usuario();
        usuario.setCorreo("usuario@gmail.com");
        usuario.setContrasena("hash-guardado");

        when(usuarioRepository.findByCorreo("usuario@gmail.com"))
                .thenReturn(Optional.of(usuario));

        when(passwordEncoder.matches(
                "contrasena-incorrecta",
                "hash-guardado"
        )).thenReturn(false);

        boolean resultado = loginService.login(dto);

        assertFalse(resultado);
    }
    @Test
    void devuelveTrueCuandoLasCredencialesSonCorrectas() {
        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setCorreo("usuario@gmail.com");
        dto.setContrasena("contrasena-correcta");

        Usuario usuario = new Usuario();
        usuario.setCorreo("usuario@gmail.com");
        usuario.setContrasena("hash-guardado");

        when(usuarioRepository.findByCorreo("usuario@gmail.com"))
                .thenReturn(Optional.of(usuario));

        when(passwordEncoder.matches(
                "contrasena-correcta",
                "hash-guardado"
        )).thenReturn(true);

        boolean resultado = loginService.login(dto);

        assertTrue(resultado);
    }
    @Test
    void devuelveFalseCuandoDtoEsNulo() {
        boolean resultado = loginService.login(null);

        assertFalse(resultado);

        verifyNoInteractions(
                usuarioRepository,
                passwordEncoder
        );
    }
}