package com.pro.pro.controllers;

import com.pro.pro.models.Citas;
import com.pro.pro.repository.CitasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
public class CitasController {

    @Autowired
    private CitasRepository citasRepository;

    @PostMapping
    public Citas createCita(@RequestBody Citas cita) {
        return citasRepository.save(cita);
    }

    @GetMapping
    public List<Citas> readAll() {
        return citasRepository.findAll();
    }

    @GetMapping("/{id}")
    public Citas readOne(@PathVariable(value = "id") Long id) {
        return citasRepository.findById(id).get();
    }

    @PutMapping("/{id}")
    public Citas update(@RequestBody Citas citaDetails, @PathVariable(value = "id") Long id) {
        Citas cita = citasRepository.findById(id).get();
        cita.setNombre(citaDetails.getNombre());
        cita.setFecha(citaDetails.getFecha());
        cita.setEmail(citaDetails.getEmail());
        cita.setEspecialidad(citaDetails.getEspecialidad());
        cita.setCedula(citaDetails.getCedula());
        cita.setDoctor(citaDetails.getDoctor());
        return citasRepository.save(cita);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        citasRepository.deleteById(id);
    }
}
