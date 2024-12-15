package com.sps.controller;

import com.sps.entity.User;
import com.sps.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user){
        User user1=userService.createUser(user);
        return new ResponseEntity<>(user1, HttpStatus.CREATED);
    }
}
