package com.pro.pro.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "usuarios")
@ToString
@Getter
@Setter
@EqualsAndHashCode
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "cedula", nullable = false, length = 15, unique = true)
    private String cedula;

    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "password")
    private String password;


}