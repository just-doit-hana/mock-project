package com.mock.service.imp;


import com.mock.dto.LoginDTO;
import com.mock.service.AuthService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService {

    private final Long EXPIRATION = 864000000L;
    private final String SIGN_KEY = "ABC_XYZ";

    @Autowired
    private AuthenticationManager manager;

    @Override
    public String login(LoginDTO dto) {
        manager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

        Date date = new Date();
        String token = Jwts
                .builder()
                .setSubject(dto.getEmail())
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime()+EXPIRATION))
                .signWith(SignatureAlgorithm.HS512, SIGN_KEY)
                .compact();

        return token;
    }
}
