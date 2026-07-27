package com.gestor.ProductivityInsights.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;

import com.gestor.ProductivityInsights.service.IDashboardService;



@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private IDashboardService dashboardService;
    
}
