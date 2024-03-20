package com.emotionoui.oui.auth.jwt;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class JwtTokenProvider {

    private final JwtUtil jwtUtil;

    private Long accessTokenExpireTime = 1000 * 60 * 60L; // 1시간

    private Long refreshTokenExpireTime = 1000 * 60 * 60 * 24 * 3L; // 3일
    @Autowired
    public JwtTokenProvider(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // 토큰에서 회원 구별 정보 추출 (여기서는 이메일)
    public String getEmailFromToken(String token) {
        return jwtUtil.getEmail(token);
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String token) {
        return !jwtUtil.isExpired(token);
    }

    // 액세스 토큰 생성
    public String createAccessToken(String email) {
        return jwtUtil.createJwt(email, accessTokenExpireTime);
    }

    public void createAccessTokenCookie(String accessToken, HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        // 쿠키 만료 시간 설정 ( 60분 )
        accessTokenCookie.setMaxAge(60*60);
        response.addCookie(accessTokenCookie);
    }

    // 리프레시 토큰 생성
    public String createRefreshToken(String email) {
        return jwtUtil.createJwt(email, refreshTokenExpireTime);
    }

    public void createRefreshTokenCookie(String refreshToken, HttpServletResponse response) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        // 쿠키 만료 시간 설정 ( 3일 )
        refreshTokenCookie.setMaxAge(3 * 24 * 60 * 60);
        response.addCookie(refreshTokenCookie);
    }

    // 요청에서 토큰을 해석하는 메소드
    public String resolveToken(HttpServletRequest request) {
        // 쿠키에서 토큰을 해석하는 메소드
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("accessToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    // 토큰을 기반으로 사용자 인증 정보를 생성하는 메소드
    public Authentication getAuthentication(String token) {
        // 토큰에서 사용자 정보(이메일)를 추출
        String email = getEmailFromToken(token);
        // UserDetails 객체 생성, 여기서는 예시로 간단하게 처리
        UserDetails userDetails = new User(email, "", new ArrayList<>());
        // 최종적으로 Authentication 객체 반환
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

}
