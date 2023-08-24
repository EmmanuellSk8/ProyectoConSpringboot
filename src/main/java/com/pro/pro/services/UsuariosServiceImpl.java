package com.pro.pro.services;

import com.pro.pro.models.Usuarios;
import com.pro.pro.repository.UsuariosRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuariosServiceImpl implements UsuariosService {

    @Autowired
    private UsuariosRepository userRepository;//inyección de dependencias

    @Transactional(readOnly = true)
    public Iterable<Usuarios> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Page<Usuarios> FindAll(java.awt.print.Pageable pageable) {
        return null;
    }

    @Override
    public Optional<Usuarios> FindById(Long id) {
        return Optional.empty();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Usuarios> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Usuarios> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional
    public Usuarios save(Usuarios user) {
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

}