package com.gestor.ProductivityInsights.service;
import com.gestor.ProductivityInsights.dto.RegisterRequestDTO;
import com.gestor.ProductivityInsights.exception.BusinessException;
import com.gestor.ProductivityInsights.model.Usuario;
import com.gestor.ProductivityInsights.repository.UsuarioRepository;
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
        if(registerRequestDTO.getNombre().isBlank()){
            throw new BusinessException("Username is required");
        }
        if(registerRequestDTO.getCorreo().isBlank()){
            throw new BusinessException("Email is required");
        }

        if(usuarioRepository.existsByNombre(registerRequestDTO.getNombre())){
            throw new BusinessException("Username already exists");
        }
        if(usuarioRepository.existsByCorreo(registerRequestDTO.getCorreo())){
            throw new BusinessException("Email already exists");
        }
        if(registerRequestDTO.getContrasena().length() < 8){
            throw new BusinessException("Password must be at least 8 characters long");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(registerRequestDTO.getNombre());
        usuario.setContrasena(passwordEncoder.encode(registerRequestDTO.getContrasena()));
        usuario.setCorreo(registerRequestDTO.getCorreo());
        usuarioRepository.save(usuario);
        System.out.println("User registered with username: " + registerRequestDTO.getNombre());
    }

}
