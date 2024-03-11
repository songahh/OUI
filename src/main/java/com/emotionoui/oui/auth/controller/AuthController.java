package com.emotionoui.oui.auth.controller;

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
public class AuthController {

    @GetMapping("/login/kakao")
    public ResponseEntity<Void> kakaoCallback(@RequestParam String code, HttpServletResponse response) throws JsonProcessingException{
        String response1 = "성공적으로 카카오 로그인 API 코드를 불러왔습니다.";
        System.out.println("코드 : " + code + " 리스폰스 :" + response);
//        AuthService.kakaoLogin(code, response);

        return  new ResponseEntity(response1, HttpStatus.OK);
    }
}
