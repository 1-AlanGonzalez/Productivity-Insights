package com.gestor.ProductivityInsights.service;
import java.util.List;
import com.gestor.ProductivityInsights.dto.TareaRequestDTO;

public interface ITareaService {
    List<TareaRequestDTO> bringTask();
    TareaRequestDTO createdTaske(TareaRequestDTO tareaRequestDTO);
    TareaRequestDTO updateTask(Long id, TareaRequestDTO tareaRequestDTO);
    void deleteTask(Long id);
}
