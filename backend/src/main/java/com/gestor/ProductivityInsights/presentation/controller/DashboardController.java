package com.gestor.ProductivityInsights.presentation.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.gestor.ProductivityInsights.service.interfaces.IDashboardService;



@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private IDashboardService dashboardService;
    
}
