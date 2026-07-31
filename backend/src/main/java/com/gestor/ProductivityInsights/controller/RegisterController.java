package com.gestor.ProductivityInsights.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestor.ProductivityInsights.dto.RegisterRequestDTO;
import com.gestor.ProductivityInsights.service.IRegisterService;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@RequestMapping("/api/authRegister")
@CrossOrigin(origins = "http://localhost:5173")
public class RegisterController {
    private IRegisterService registerService;

    public RegisterController(IRegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO dto) {
        try {
            registerService.register(dto);
            return ResponseEntity.ok("Usuario registrado correctamente"); // OK es el código de estado HTTP 200
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // bad request es el código de estado HTTP 400, body contiene el mensaje de error 
        }
    
    }

}
