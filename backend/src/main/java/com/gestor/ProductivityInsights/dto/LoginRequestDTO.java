package com.gestor.ProductivityInsights.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class LoginRequestDTO {
    private String contrasena;
    private String correo;
}
