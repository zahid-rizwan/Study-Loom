package com.sps.service.serviceimpl;

import com.sps.entity.User;
import com.sps.entity.UserPrincipal;
import com.sps.exception.InvalidCredentialsException;
import com.sps.model.JwtRequest;
import com.sps.model.JwtResponse;
import com.sps.repository.UserRepository;
import com.sps.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public JwtResponse verify(JwtRequest jwtRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword())
            );
            if (authentication.isAuthenticated()) {
                    Object principal = authentication.getPrincipal();
                    if(principal instanceof UserPrincipal) {
                        UserPrincipal userPrincipal = (UserPrincipal) principal;
                        User authenticatedUser = userPrincipal.getUser();

                        System.out.println("Username:" + authenticatedUser.getName());
                        System.out.println("Authorities" + authenticatedUser.getId());

                        String token = jwtService.generateToken(authenticatedUser.getName());
                        JwtResponse jwtResponse= new JwtResponse(token , authenticatedUser);
                        return jwtResponse;
                    }
            }

        } catch (Exception ex) {
            throw new InvalidCredentialsException("Invalid username or password.");
        }
        return null;
    }


    @Override
    public List<User> getUsers() {
        List<User> users =userRepository.findAll();
        return users;
    }
}
