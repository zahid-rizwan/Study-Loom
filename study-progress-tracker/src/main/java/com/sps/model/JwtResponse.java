package com.sps.model;

import com.sps.entity.User;
import org.springframework.stereotype.Component;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Component
public class JwtResponse {
    private String jwtToken;
    private User user;

    public JwtResponse() {
    }

    public JwtResponse(String jwtToken, User user) {
        this.jwtToken = jwtToken;
        this.user = user;
    }


    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
