package com.jwt.service.serviceImpl;

import com.jwt.model.Otp;
import com.jwt.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OtpService {
    @Autowired
    private OtpRepository otpRepository;

    public String generateOtp(String email) {
        String otp = String.valueOf((int) (Math.random() * 9000) + 1000);
        Otp otpEntity = new Otp();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpirationTime(LocalDateTime.now().plusMinutes(10));
        otpRepository.save(otpEntity);
        return otp;
    }

    public boolean validateOtp(String email, String otp) {
        Optional<Otp> otpEntity = otpRepository.findByEmailAndOtp(email, otp);
        if (otpEntity.isPresent() && otpEntity.get().getExpirationTime().isAfter(LocalDateTime.now())) {
            otpRepository.delete(otpEntity.get());
            return true;
        }
        return false;
    }
}

