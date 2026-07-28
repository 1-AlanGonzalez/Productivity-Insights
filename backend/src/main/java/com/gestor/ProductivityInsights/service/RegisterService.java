package com.gestor.ProductivityInsights.service;
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
        Usuario usuario = new Usuario();
        usuario.setNombre(username);
        usuario.setContrasena(password);
        usuario.setCorreo(email);
        usuarioRepository.save(usuario);
        System.out.println("User registered with username: " + username);
    }

}
