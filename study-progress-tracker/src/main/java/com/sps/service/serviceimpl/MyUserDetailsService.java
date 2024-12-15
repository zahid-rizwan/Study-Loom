package com.sps.service.serviceimpl;

import com.sps.entity.User;
import com.sps.entity.UserPrincipal;
import com.sps.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user1 = userRepository.findByName(username);
        if(user1==null) {
            System.out.println("User Not found");
            throw new UsernameNotFoundException("User not found");
        }
        return new UserPrincipal(user1);
    }
}
