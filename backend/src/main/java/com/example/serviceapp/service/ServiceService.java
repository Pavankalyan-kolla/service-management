package com.example.serviceapp.service;

import com.example.serviceapp.dto.ServiceDTO;
import com.example.serviceapp.entity.ServiceEntity;
import com.example.serviceapp.exception.ResourceNotFoundException;
import com.example.serviceapp.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceService {
    @Autowired
    private ServiceRepository repo;

    private ServiceDTO toDTO(ServiceEntity e) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(e.getId());
        dto.setName(e.getName());
        dto.setDescription(e.getDescription());
        dto.setPrice(e.getPrice());
        dto.setIsActive(e.getIsActive());
        dto.setCreatedAt(e.getCreatedAt());
        dto.setUpdatedAt(e.getUpdatedAt());
        return dto;
    }

    private ServiceEntity toEntity(ServiceDTO dto) {
        ServiceEntity e = new ServiceEntity();
        e.setId(dto.getId());
        e.setName(dto.getName());
        e.setDescription(dto.getDescription());
        e.setPrice(dto.getPrice());
        e.setIsActive(dto.getIsActive() == null ? true : dto.getIsActive());
        return e;
    }

    public List<ServiceDTO> getAllActive() {
        return repo.findByIsActiveTrue().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ServiceDTO getById(Long id) {
        ServiceEntity e = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        return toDTO(e);
    }

    public ServiceDTO create(ServiceDTO dto) {
        ServiceEntity e = toEntity(dto);
        ServiceEntity saved = repo.save(e);
        return toDTO(saved);
    }

    public ServiceDTO update(Long id, ServiceDTO dto) {
        ServiceEntity existing = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());
        existing.setPrice(dto.getPrice());
        if (dto.getIsActive() != null) existing.setIsActive(dto.getIsActive());
        ServiceEntity saved = repo.save(existing);
        return toDTO(saved);
    }

    public void softDelete(Long id) {
        ServiceEntity existing = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        existing.setIsActive(false);
        repo.save(existing);
    }
}
