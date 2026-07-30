package com.gestor.ProductivityInsights.controller;

import com.gestor.ProductivityInsights.dto.LoginRequestDTO;
import com.gestor.ProductivityInsights.service.ILoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import org.springframework.security.web.context.SecurityContextRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    private final ILoginService loginService;
    private final SecurityContextRepository securityContextRepository;

    public LoginController(
          ILoginService loginService,
          SecurityContextRepository securityContextRepository
    ) {
        this.loginService = loginService;
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping
    public ResponseEntity<Void> login(
          @Valid @RequestBody LoginRequestDTO dto,
          HttpServletRequest request,
          HttpServletResponse response
        ) {
        boolean credencialesValidas = loginService.login(dto);

       if (credencialesValidas) {
        UsernamePasswordAuthenticationToken authentication =
                UsernamePasswordAuthenticationToken.authenticated(dto.getCorreo().trim(), null,
                        List.of(new SimpleGrantedAuthority("ROLE_USER")));

        SecurityContext context = SecurityContextHolder.createEmptyContext();

        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        securityContextRepository.saveContext(context, request, response);
        return ResponseEntity.ok().build();
    }
        return ResponseEntity.status(401).build();
    }
}
