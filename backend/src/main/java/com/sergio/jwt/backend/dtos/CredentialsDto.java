package com.sergio.jwt.backend.dtos;

public record CredentialsDto (String email, char[] password) { }