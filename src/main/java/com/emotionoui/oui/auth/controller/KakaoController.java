package com.emotionoui.oui.auth.controller;

import com.emotionoui.oui.auth.service.AuthService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class KakaoController {
    private final AuthService authService;

    @GetMapping("/login/kakao")
    public ResponseEntity<Void> kakaoCallback(@RequestParam String code, HttpServletResponse response) throws JsonProcessingException {
        String msg = "성공적으로 카카오 로그인 API 코드를 불러왔습니다.";
        authService.kakaoLogin(code, response);

        return new ResponseEntity(msg, HttpStatus.OK);
    }
}

