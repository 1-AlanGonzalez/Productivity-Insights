package com.gestor.ProductivityInsights.service;
import com.gestor.ProductivityInsights.exception.BusinessException;
import com.gestor.ProductivityInsights.model.Usuario;
import com.gestor.ProductivityInsights.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class RegisterService implements IRegisterService {
    
    
    private UsuarioRepository usuarioRepository;

    public RegisterService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    
    @Override
    public void register(String username, String password, String email) {
        if(username.isBlank()){
            throw new BusinessException("Username is required");
        }
        if(email.isBlank()){
            throw new BusinessException("Email is required");
        }

        if(usuarioRepository.existsByUsername(username)){
            throw new BusinessException("Username already exists");
        }
        if(usuarioRepository.existsByEmail(email)){
            throw new BusinessException("Email already exists");
        }
        if(password.length() < 8){
            throw new BusinessException("Password must be at least 8 characters long");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(username);
        usuario.setContrasena(password);
        usuario.setCorreo(email);
        usuarioRepository.save(usuario);
        System.out.println("User registered with username: " + username);
    }

}
