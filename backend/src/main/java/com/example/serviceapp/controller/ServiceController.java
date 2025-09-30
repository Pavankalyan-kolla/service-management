package com.example.serviceapp.controller;

import com.example.serviceapp.dto.ServiceDTO;
import com.example.serviceapp.exception.ResourceNotFoundException;
import com.example.serviceapp.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServiceService service;

    @GetMapping
    public List<ServiceDTO> listActive() {
        return service.getAllActive();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceDTO> getOne(@PathVariable Long id) {
        try {
            ServiceDTO dto = service.getById(id);
            return ResponseEntity.ok(dto);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ServiceDTO> create(@RequestBody ServiceDTO dto) {
        ServiceDTO created = service.create(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceDTO> update(@PathVariable Long id, @RequestBody ServiceDTO dto) {
        try {
            ServiceDTO updated = service.update(id, dto);
            return ResponseEntity.ok(updated);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            service.softDelete(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
