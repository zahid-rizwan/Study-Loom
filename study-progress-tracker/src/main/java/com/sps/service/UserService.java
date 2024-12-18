package com.sps.service;

import com.sps.entity.User;

import java.util.List;

//import java.util.List;

public interface UserService {
    User createUser(User user);

    String verify(User user);
//
    List<User> getUsers();
}
