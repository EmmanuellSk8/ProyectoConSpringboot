package com.pro.pro.repository;

import com.pro.pro.models.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Long> {

    Usuarios findByEmailAndPassword(String email, String password);

}