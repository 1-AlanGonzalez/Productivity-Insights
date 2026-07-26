package com.gestor.ProductivityInsights.service;

public class RegisterService implements IRegisterService {
    @Override
    public void register(String username, String password) {
        // Implement the registration logic here
        // For example, you can save the user details to a database
        System.out.println("User registered with username: " + username);
    }

}
