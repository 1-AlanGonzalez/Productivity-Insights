package com.gestor.ProductivityInsights.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestor.ProductivityInsights.dto.RegisterRequestDTO;
import com.gestor.ProductivityInsights.service.IRegisterService;

@RestController
@RequestMapping("/api/register")
public class RegisterController {
    private IRegisterService registerService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO dto) {

        // Después llamarás al service

        return ResponseEntity.ok("Usuario registrado correctamente");
    }
}
