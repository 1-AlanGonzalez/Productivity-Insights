package com.gestor.ProductivityInsights.presentation.dto;

public record ApiErrorResponse(
        int status,
        String message) {
}
