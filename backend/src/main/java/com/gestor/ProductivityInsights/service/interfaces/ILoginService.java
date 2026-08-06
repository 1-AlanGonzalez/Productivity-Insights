package com.gestor.ProductivityInsights.service.interfaces;
import com.gestor.ProductivityInsights.presentation.dto.LoginRequestDTO;

public interface ILoginService {
    boolean login(LoginRequestDTO dto);
}
