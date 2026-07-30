package com.gestor.ProductivityInsights.service;
import com.gestor.ProductivityInsights.dto.LoginRequestDTO;

public interface ILoginService {
    boolean login(LoginRequestDTO dto);
}