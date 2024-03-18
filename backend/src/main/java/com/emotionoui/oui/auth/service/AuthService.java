package com.emotionoui.oui.auth.service;

import com.emotionoui.oui.auth.dto.res.KakaoLoginRes;
import com.emotionoui.oui.auth.jwt.JwtTokenProvider;
import com.emotionoui.oui.member.dto.Member;
import com.emotionoui.oui.member.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class AuthService {
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String REST_API_KEY;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String REDIRECT_URL;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String CLIENT_SECRET;

    private final JwtTokenProvider jwtTokenProvider;
    private final UserDetailsService userDetailsService;

    @Autowired
    public AuthService(JwtTokenProvider jwtTokenProvider, UserDetailsService userDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }


    public KakaoLoginRes kakaoLogin(String code, HttpServletResponse response) throws JsonProcessingException {
        // 1. 인가코드로 엑세스토큰 가져오기
        String accessToken = getAccessToken(code);
        // 2. 엑세스토큰으로 유저정보 가져오기
        KakaoLoginRes kakaoLoginRes = getKakaoMemberInfo(accessToken);

        return kakaoLoginRes;
    }

    // #1 - 인가코드로 엑세스토큰 가져오기
    private String getAccessToken(String code) throws JsonProcessingException {

        // 헤더에 Content-type 지정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 바디에 필요한 정보 담기
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", REST_API_KEY);
        params.add("redirect_uri", REDIRECT_URL);
        params.add("code", code);
        params.add("client_secret", CLIENT_SECRET); //필수는 아니지만 보안강화 할떄 필요함

        // POST 요청 보내기
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                entity,
                String.class
        );

        // response에서 엑세스토큰 가져오기
        String tokenJson = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(tokenJson);
        String accessToken = jsonNode.get("access_token").asText();

        return accessToken;
    }

    // #2. 엑세스토큰으로 유저정보 가져오기
    private KakaoLoginRes getKakaoMemberInfo(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // GET 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoMemberInfoRequest = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                kakaoMemberInfoRequest,
                String.class
        );

        // HTTP 응답 상태 코드 검사
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new IllegalStateException("카카오 API 요청에 실패했습니다. 상태 코드: " + response.getStatusCode());
        }

        String responseBody = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
//        System.out.println("jsonNode: " + jsonNode); // 무슨 값이 들어오는지 확인

        // jsonNode 체크후 필요한 정보(email) 가져오기
        String email = (jsonNode.get("kakao_account").get("email") != null) ?
                jsonNode.get("kakao_account").get("email").asText() : null;

        // 이메일 정보가 없으면 예외 발생시킴
        if (email==null) {
            throw new IllegalStateException("이메일 정보가 없습니다. 이메일은 필수 동의 항목입니다.");
        }

        System.out.println("email: " + email);
        return new KakaoLoginRes(email);
    }


    public String generateNewAccessToken(String refreshToken) throws Exception {
        // refreshToken의 유효성을 검증합니다.
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new IllegalArgumentException("리프레시 토큰이 유효하지 않습니다.");
        }

        // refreshToken에서 사용자 이름(이메일 등)을 추출합니다.
        String email = jwtTokenProvider.getEmailFromToken(refreshToken);

        // 사용자 이름으로 사용자 정보를 불러옵니다.
        // 이 과정에서 사용자가 존재하지 않으면 UsernameNotFoundException을 발생시킵니다.
        userDetailsService.loadUserByUsername(email);

        // 새로운 accessToken을 생성합니다.
        return jwtTokenProvider.createAccessToken(email);
    }
}
