package com.sps.service.serviceimpl;

import com.sps.entity.User;
import com.sps.repository.UserRepository;
import com.sps.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service

public class UserServiceImpl  implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @Autowired
    private JWTService jwtService;


    @Override
    public User createUser(User user) {
            user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public String verify(User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getName(),user.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(user.getName());
        }
        return "failure";
    }
}
