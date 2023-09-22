package com.pro.pro.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pro.pro.models.Usuarios;
import com.pro.pro.repository.UsuariosRepository;

@Service
public class AuthService {

    @Autowired
    private UsuariosRepository usuarioRepository;

    public boolean autenticarUsuario(String email, String password) {
        Usuarios usuario = usuarioRepository.findByEmailAndPassword(email, password);
        return usuario != null;
    }
}