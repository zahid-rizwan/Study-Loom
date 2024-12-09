package com.sps.service.serviceimpl;

import com.sps.entity.User;
import com.sps.repository.UserRepository;
import com.sps.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImpl  implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
