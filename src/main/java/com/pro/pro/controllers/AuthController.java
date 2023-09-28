package com.pro.pro.controllers;

import com.pro.pro.repository.UsuariosRepository;
import com.pro.pro.services.UsuariosServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.pro.pro.models.Usuarios;

@RestController
public class AuthController {

    @Autowired
    private UsuariosServiceImpl usuariosServiceImpl;
    @Autowired
    UsuariosRepository usuariosRepository;

    @PostMapping("api/login")
    public String login(@RequestBody Usuarios usuarios) {
        Usuarios usuariologueado = usuariosServiceImpl.obtenerUsuarioPorCredenciales(usuarios);
        if (usuariologueado != null) {
            // Autenticación exitosa
            return "ENCONTRADO";
        }else {
            // Autenticación fallida
            return "ERROR";
        }
    }
}