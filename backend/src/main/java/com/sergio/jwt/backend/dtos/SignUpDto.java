package com.sergio.jwt.backend.dtos;

public record SignUpDto (String userName, String email, char[] password) { }
