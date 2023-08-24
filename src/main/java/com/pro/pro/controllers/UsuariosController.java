package com.pro.pro.controllers;

import com.pro.pro.models.Usuarios;
import com.pro.pro.services.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/usuarios")
public class UsuariosController {
    @Autowired
    private UsuariosService userService;//principio de Inversión de Dependencias (IoD)

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Usuarios user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> readOne(@PathVariable(value = "id") Long id) {
        Optional<Usuarios> oUser = userService.findById(id);

        if (!oUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oUser);
    }

    //Update an user
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Usuarios userDetails, @PathVariable(value = "id") Long id) {
        Optional<Usuarios> user = userService.findById(id);
        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        user.get().setNombres(userDetails.getNombres());
        user.get().setApellidos(userDetails.getApellidos());
        user.get().setTelefono(userDetails.getTelefono());
        user.get().setEmail(userDetails.getEmail());
        user.get().setPassword(userDetails.getPassword());
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user.get()));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Long id) {
        if (!userService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Usuarios> readAll() {
        List<Usuarios> users = StreamSupport//<--hereda de Object y me trae los stream
                .stream(userService.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return users;
    }
}