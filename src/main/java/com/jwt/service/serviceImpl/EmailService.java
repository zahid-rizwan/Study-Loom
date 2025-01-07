package com.jwt.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("$(spring.mail.username)")
    private String fromEmailId;
    public void sendEmail (String recipient,String body, String subject){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("zahidibnrizwan@gmail.com");
        simpleMailMessage.setSubject("waw");
        simpleMailMessage.setTo(recipient);
        simpleMailMessage.setText(subject);
        javaMailSender.send(simpleMailMessage);





    }

}

