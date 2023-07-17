package com.yun.backend.controllers;

import com.yun.backend.config.UserAuthenticationProvider;
import com.yun.backend.dtos.*;
import com.yun.backend.entites.User;
import com.yun.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto));
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/user")
    public ResponseEntity<UserDto> changeUsername(@RequestBody @Valid ChangeUserNameDto changeUserNameDto) {
        UserDto updatedUser = userService.changeUsername(changeUserNameDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/user")
    public ResponseEntity<String> deleteUser(@RequestBody @Valid DeleteUserDto deleteUser){
        userService.deleteById(deleteUser.id());
        return ResponseEntity.ok("User Deleted");
    }
    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

}
