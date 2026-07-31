package com.gestor.ProductivityInsights.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.gestor.ProductivityInsights.service.IDashboardService;



@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private IDashboardService dashboardService;
    
}
