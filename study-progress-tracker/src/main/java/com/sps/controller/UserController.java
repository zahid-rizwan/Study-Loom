package com.sps.controller;

import com.sps.entity.User;
import com.sps.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user){
        System.out.println("Hello");
        User user1=userService.createUser(user);
        return new ResponseEntity<>(user1, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user){
        System.out.println(user);
//            return new ResponseEntity<>("success",HttpStatus.OK);
        String token=userService.verify(user);
        System.out.println("token:"+token);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        List<User> user =userService.getUsers();
        System.out.println("hello");
        for(User user1:user){
            System.out.println(user1);
        }
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
//    @GetMapping("/users")
//    public String getUser(){
//        return "Welcome";
//    }
    @GetMapping("/csrf")
    public CsrfToken getCsrfToken(HttpServletRequest request){
        return (CsrfToken) request.getAttribute("_csrf");
    }
}
