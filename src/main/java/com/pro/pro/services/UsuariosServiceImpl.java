package com.pro.pro.services;

import com.pro.pro.models.Usuarios;
import com.pro.pro.repository.UsuariosRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuariosServiceImpl implements UsuariosService {
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private UsuariosRepository userRepository;//inyección de dependencias

    public Usuarios obtenerUsuarioPorCredenciales(Usuarios usuario) {
        String hql = "FROM Usuarios WHERE email = :email" +
                " AND password = :password";
        List<Usuarios> lista = entityManager.createQuery(hql)
                .setParameter("email", usuario.getEmail())
                .setParameter("password", usuario.getPassword())
                .getResultList();


        if (lista.isEmpty()) {
            return null;
        }
        return lista.get(0);
    }

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

    @Override
    public Usuarios findByEmailAndPassword(String email, String password) {
        throw new UnsupportedOperationException("Unimplemented method 'findByEmailAndPassword'");
    }
}