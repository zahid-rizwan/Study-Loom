package com.jwt.controller;

import com.jwt.model.User;
import com.jwt.repository.UserRepository;
import com.jwt.service.serviceImpl.OtpService;
import com.jwt.service.serviceImpl.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            return ResponseEntity.badRequest().body("Invalid email format");
        }

        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));
        if (user.isPresent() && user.get().isVerified()) {
            System.out.println("what");
            return ResponseEntity.badRequest().body("Email is already verified");
        }

        String otp = otpService.generateOtp(email);
        emailService.sendEmail(email,otp,otp);
        return ResponseEntity.ok("OTP sent to email");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        if (otpService.validateOtp(email, otp)) {
            Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));
            if (user.isEmpty()) {
                userRepository.save(new User(email, null, true)); // Save as verified
            } else {
                user.get().setVerified(true);
                userRepository.save(user.get());
            }
            return ResponseEntity.ok("Email verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired OTP");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));
        if (user.isEmpty() || !user.get().isVerified()) {
            return ResponseEntity.badRequest().body("Email is not verified");
        }

        user.get().setPassword(password); // Save password securely (hashing required)
        userRepository.save(user.get());
        return ResponseEntity.ok("User registered successfully");
    }
}
