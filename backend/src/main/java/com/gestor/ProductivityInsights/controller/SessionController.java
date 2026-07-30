 package com.gestor.ProductivityInsights.controller;

import com.gestor.ProductivityInsights.dto.SessionResponseDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SessionController {

@GetMapping("/me")
public SessionResponseDTO me(Authentication authentication) {
    return new SessionResponseDTO(authentication.getName());
}
}