package com.sps.service;

import com.sps.entity.User;

public interface UserService {
    User createUser(User user);

    String verify(User user);
}
