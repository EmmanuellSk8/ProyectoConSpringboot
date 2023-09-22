package com.pro.pro.services;

import com.pro.pro.models.Usuarios;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.Optional;

public interface UsuariosService {

    public Iterable<Usuarios> findAll();

    public Page<Usuarios> FindAll(Pageable pageable);

    public Optional <Usuarios> FindById (Long id);

    @Transactional(readOnly = true)
    Page<Usuarios> findAll(org.springframework.data.domain.Pageable pageable);

    @Transactional(readOnly = true)
    Optional<Usuarios> findById(Long id);

    public Usuarios save (Usuarios usuarios);

    public void deleteById(Long id);

    public Usuarios findByEmailAndPassword(String email, String password);

}
