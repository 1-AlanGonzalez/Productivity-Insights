package com.gestor.ProductivityInsights.service;
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
    public void register(String username, String password, String correo) {
        if(username == null || username.isBlank()){
            throw new BusinessException("Username is required");
        }
        if(correo == null || correo.isBlank()){
            throw new BusinessException("Email is required");
        }
        if (password == null || password.isBlank()){
            throw new BusinessException("Password is required");
        }
        if(usuarioRepository.existsByNombre(username)){
            throw new BusinessException("Username already exists");
        }
        if(usuarioRepository.existsByCorreo(correo)){
            throw new BusinessException("Email already exists");
        }
        if(password.length() < 8){
            throw new BusinessException("Password must be at least 8 characters long");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(username);
        usuario.setContrasena(passwordEncoder.encode(password));
        usuario.setCorreo(correo);
        usuarioRepository.save(usuario);
        System.out.println("User registered with username: " + username);
    }

}
