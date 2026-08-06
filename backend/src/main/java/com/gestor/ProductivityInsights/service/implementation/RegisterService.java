package com.gestor.ProductivityInsights.service.implementation;
import com.gestor.ProductivityInsights.persistence.model.Usuario;
import com.gestor.ProductivityInsights.persistence.repository.UsuarioRepository;
import com.gestor.ProductivityInsights.presentation.dto.RegisterRequestDTO;
import com.gestor.ProductivityInsights.service.exception.BusinessException;
import com.gestor.ProductivityInsights.service.interfaces.IRegisterService;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class RegisterService implements IRegisterService {
    
    
    private UsuarioRepository usuarioRepository;
    private PasswordEncoder passwordEncoder;

    public RegisterService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void register(RegisterRequestDTO registerRequestDTO) {
        if (registerRequestDTO == null) {
          throw new BusinessException("Los datos son obligatorios");
        }

        String username = registerRequestDTO.getNombre();
        String correo = registerRequestDTO.getCorreo();
        String password = registerRequestDTO.getContrasena();

        if (username == null || username.isBlank()) {
            throw new BusinessException("El nombre de usuario es obligatorio");
        }

        if (correo == null || correo.isBlank()) {
            throw new BusinessException("El email es obligatorio");
        }

        if (password == null || password.isBlank()) {
            throw new BusinessException("La contraseña es obligatoria");
        }

        if (password.length() < 8) {
            throw new BusinessException(
                    "La contraseña debe tener al menos 8 caracteres"
            );
        }

        if (usuarioRepository.existsByNombre(username)) {
            throw new BusinessException("El nombre de usuario ya existe");
        }

        if (usuarioRepository.existsByCorreo(correo)) {
            throw new BusinessException("El email ya existe");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(registerRequestDTO.getNombre());
        usuario.setContrasena(passwordEncoder.encode(registerRequestDTO.getContrasena()));
        usuario.setCorreo(registerRequestDTO.getCorreo());
        usuarioRepository.save(usuario);
        System.out.println("User registered with username: " + registerRequestDTO.getNombre());
    }

}
