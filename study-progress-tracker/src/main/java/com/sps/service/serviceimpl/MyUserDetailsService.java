package com.sps.service.serviceimpl;

import com.sps.entity.User;
import com.sps.entity.UserPrincipal;
import com.sps.exception.UserNotFoundException;
import com.sps.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UserNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("User with username '" + email + "' not found.");
        }
        return new UserPrincipal(user);
    }

}
