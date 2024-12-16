package com.sps.service.serviceimpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class JWTService {
    private String seceretKey = "";
    public JWTService() throws NoSuchAlgorithmException {
        KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
        SecretKey sk = keyGen.generateKey();
        seceretKey= Base64.getEncoder().encodeToString(sk.getEncoded());
    }
    public String generateToken(String username) {
        Map<String,Object> claims = new HashMap<>();
         return Jwts.builder()
                 .claims()
                 .add(claims)
                 .subject(username)
                 .issuedAt(new Date(System.currentTimeMillis()))
                 .expiration(new Date(System.currentTimeMillis() * 60 * 60 * 30))
                 .and()
                 .signWith(getKey())
                 .compact();
    }
    private Key getKey(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(seceretKey));
    }
}
