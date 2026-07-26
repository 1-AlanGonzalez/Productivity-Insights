package com.gestor.ProductivityInsights.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestor.ProductivityInsights.service.ITareaService;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/tarea")
public class TareaController {
    private ITareaService tareaService;

    @GetMapping()
    public ResponseEntity<List<TareaDTO>> bingTask(){
        return ResponseEntity.ok(tareaService.bringTask());
    }

    @PostMapping
    public ResponseEntity<TareaDTO> createdTask (@RequestBody TareaDTO tareaDTO){
        TareaDTO createdTask = tareaService.createdTaske(tareaDTO);
        return ResponseEntity.created(URI.create("/api/tarea" + createdTask.getId())).body(createdTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TareaDTO> updateTask(@PathVariable Long id, @RequestBody TareaDTO tareaDTO){
        TareaDTO updatedTask = tareaService.updateTask(id, tareaDTO);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
        tareaService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
    
}

