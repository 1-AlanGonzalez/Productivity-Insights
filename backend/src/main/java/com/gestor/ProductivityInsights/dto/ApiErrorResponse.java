package com.gestor.ProductivityInsights.dto;

public record ApiErrorResponse(
        int status,
        String message) {
}