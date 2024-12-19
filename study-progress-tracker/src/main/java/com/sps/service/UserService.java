package com.sps.service;

import com.sps.entity.User;
import com.sps.model.JwtRequest;
import com.sps.model.JwtResponse;

import java.util.List;

//import java.util.List;

public interface UserService {
    User createUser(User user);

    JwtResponse verify(JwtRequest jwtRequest);
//
    List<User> getUsers();
}
