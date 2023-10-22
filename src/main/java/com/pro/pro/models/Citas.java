package com.pro.pro.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Entity
@Table(name = "citas")
@AllArgsConstructor
@NoArgsConstructor
public class Citas {

    @Id
    private long id;
    private String nombre;
    private String fecha;
    private String email;
    private String especialidad;
    private String cedula;
    private String doctor;

}
