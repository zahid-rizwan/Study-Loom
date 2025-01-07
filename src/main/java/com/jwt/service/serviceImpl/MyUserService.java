package com.jwt.service.serviceImpl;

import com.jwt.model.User;
import com.jwt.model.UserPrincipal;
import com.jwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if(user==null){
            System.out.println("NO user found");
            throw new UsernameNotFoundException("User not found");

        }
        else System.out.println("User found");
        return new UserPrincipal(user);

    }
}
