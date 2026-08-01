package com.gestor.ProductivityInsights.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestor.ProductivityInsights.dto.TareaRequestDTO;
import com.gestor.ProductivityInsights.service.ITareaService;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/tarea")
public class TareaController {
    private ITareaService tareaService;

    public TareaController(ITareaService tareaService) {
        this.tareaService = tareaService;
    }

    @GetMapping()
    public ResponseEntity<List<TareaRequestDTO>> traerTareas(){
        return ResponseEntity.ok(tareaService.traerTareas());
    }

    @PostMapping
    public ResponseEntity<TareaRequestDTO> crearTarea (@RequestBody TareaRequestDTO tareaDTO){
        TareaRequestDTO createdTask = tareaService.crearTarea(tareaDTO);
        return ResponseEntity.created(URI.create("/api/tarea" + createdTask.getId())).body(createdTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TareaRequestDTO> updateTask(@PathVariable Long id, @RequestBody TareaRequestDTO tareaDTO){
        TareaRequestDTO updatedTask = tareaService.actualizarTarea(id, tareaDTO);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
        tareaService.eliminarTarea(id);
        return ResponseEntity.noContent().build();
    }
    
}

