package com.jwt.controller;

import com.jwt.model.User;
import com.jwt.service.UserService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    @Autowired
    private UserService userService;
    @GetMapping("/get")
    String getData(HttpServletRequest request){
        return request.getSession().getId();
    }
//    @GetMapping("/csrf")
//    public CsrfToken getCsrf(HttpServletRequest request){
//        return (CsrfToken) request.getAttribute("_csrf");
//
//    }
    @PostMapping("/save")
    ResponseEntity<User> register(@RequestBody User user){
        return  new ResponseEntity<>(userService.
                register(user),HttpStatus.CREATED);
    }

}
