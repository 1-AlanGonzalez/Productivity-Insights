package com.gestor.ProductivityInsights.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestor.ProductivityInsights.service.ILoginService;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    private ILoginService loginService;

   

    // Add your login endpoint here
}
