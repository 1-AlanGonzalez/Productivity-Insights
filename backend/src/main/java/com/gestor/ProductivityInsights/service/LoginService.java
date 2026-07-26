package com.gestor.ProductivityInsights.service;

public class LoginService implements ILoginService {
    @Override
    public void login(String username, String password) {
        // Implement the login logic here
        // For example, you can check the username and password against a database
        System.out.println("User logged in with username: " + username);
    }

}
