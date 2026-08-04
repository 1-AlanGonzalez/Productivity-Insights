package com.gestor.ProductivityInsights.persistence.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity // Marca la clase como una entidad de JPA
@Table(name = "usuario") // Especifica el nombre de la tabla en la base de datos
@Getter // Genera automáticamente los métodos getter para todos los campos
@Setter // Genera automáticamente los métodos setter para todos los campos
@AllArgsConstructor // Genera automáticamente un constructor con todos los campos como parámetros
@NoArgsConstructor // Genera automáticamente un constructor vacío
public class Usuario {
    // Usuario representa un usuario del sistema,

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Genera automáticamente el valor del ID
    @Column(name = "ID_USUARIO") // Especifica el nombre de la columna en la base de datos
    private Long id; // Identificador único del usuario

    @Column(name = "NOMBRE", nullable = false, length = 50) // Especifica el nombre de la columna y que no puede ser nulo
    private String nombre; // Nombre del usuario

    @Column(name = "CORREO", nullable = false, unique = true, length = 100) // Especifica el nombre de la columna, que no puede ser nulo y que debe ser único
    private String correo; // Correo electrónico del usuario 

    @Column(name = "CONTRASENA", nullable = false, length = 255) // Especifica el nombre de la columna y que no puede ser nulo
    private String contrasena; // Contraseña del usuario


    // Constructor con parámetros para crear un usuario con nombre, correo y contraseña
    public Usuario(String nombre, String correo, String contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;   
    }

}
