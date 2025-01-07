package com.jwt.service.serviceImpl;

import com.jwt.model.User;
import com.jwt.repository.UserRepository;
import com.jwt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private  UserRepository userRepository;
    @Override
    public User register(User user) {
        return userRepository.save(user);

    }
}
