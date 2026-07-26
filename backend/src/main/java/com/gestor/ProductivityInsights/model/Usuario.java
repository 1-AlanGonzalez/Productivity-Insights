package com.gestor.ProductivityInsights.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity // Marca la clase como una entidad de JPA
@Table(name = "usuario") // Especifica el nombre de la tabla en la base de datos
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

    // Constructor vacío requerido por JPA
    public Usuario() {}

    // Constructor con parámetros para crear un usuario con nombre, correo y contraseña
    public Usuario(String nombre, String correo, String contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;   
    }

    // Getters 
    public String getNombre() {
        return nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public String getContrasena() {
        return contrasena;
    }
    public Long getID() {
        return id;
    }

    // Setters
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
