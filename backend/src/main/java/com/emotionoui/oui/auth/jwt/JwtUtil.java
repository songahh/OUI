package com.emotionoui.oui.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date; // java.sql.Date 대신 java.util.Date 사용

@Component
public class JwtUtil {
    private Key key;

    public JwtUtil(@Value("${jwt.secret}") String secret) {
        byte[] byteSecretKey = Decoders.BASE64.decode(secret);
        key = Keys.hmacShaKeyFor(byteSecretKey); // 객체 key 생성
    }

    // Member email 검증
    public String getEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("email", String.class);
    }

    // 토큰 만료 일자 검증
    public int isExpired(String token) {
        int check = 0; // 0 : 유효 , 1 : 만료 , 2 : 이상한 토큰
//        boolean expired;
        try { // 유효하다면 false
            if (!Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration().before(new Date(System.currentTimeMillis()))) {
                check = 0;
            };
        } catch (ExpiredJwtException e) { // 만료되었다면 true
//          expired = true;
            check = 1;
        } catch (Exception e) { // 다른 이유로 이상한 토큰이라면 true
//          expired = true;
            check = 2;
        }
        return check;
    }

    // 토큰 생성
    public String createJwt(String email, Long expiredMs) {
        Claims claims = Jwts.claims();
        claims.put("email", email);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(key, SignatureAlgorithm.HS256) //암호화
                .compact();
    }

}
