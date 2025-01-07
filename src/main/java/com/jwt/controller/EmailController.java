package com.jwt.controller;

import com.jwt.service.serviceImpl.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/")
public class EmailController {
    @Autowired
    private EmailService sendEmailService;

    @GetMapping("/verify-email")
    public String sendEmail(){
        sendEmailService.sendEmail("mdzahid56726@gmail.com","body","Your otp");
        return "sent";
    }

}
