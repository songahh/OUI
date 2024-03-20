package com.emotionoui.oui.auth.service;

import com.emotionoui.oui.auth.dto.res.KakaoLoginRes;
import com.emotionoui.oui.auth.exception.KakaoGetMemberException;
import com.emotionoui.oui.auth.exception.KakaoGetTokenException;
import com.emotionoui.oui.auth.exception.MemberNotFoundException;
import com.emotionoui.oui.auth.jwt.JwtTokenProvider;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    /**
     * 카카오에서 유저 정보(email) 받아오기
     * @param code
     * @param response
     * @return
     * @throws JsonProcessingException
     */
    public KakaoLoginRes kakaoLogin(String code, HttpServletResponse response) throws JsonProcessingException {
        // 1. 인가코드로 엑세스토큰 가져오기
        String accessToken = getAccessToken(code);
        // 2. 엑세스토큰으로 유저정보 가져오기
        KakaoLoginRes kakaoLoginRes = getKakaoMemberInfo(accessToken);

        return kakaoLoginRes;
    }

    // #1 - 인가코드로 엑세스토큰 가져오기
    private String getAccessToken(String code){

        // 헤더에 Content-type 지정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 바디에 필요한 정보 담기
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", REST_API_KEY);
        params.add("redirect_uri", REDIRECT_URL);
        params.add("code", code);
        params.add("client_secret", CLIENT_SECRET);

        try {
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
        }catch (Exception e){
            throw new KakaoGetTokenException(e);
        }
    }

    // #2. 엑세스토큰으로 유저정보 가져오기
    private KakaoLoginRes getKakaoMemberInfo(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        try{
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

            // jsonNode 체크후 필요한 정보(email) 가져오기
            String email = (jsonNode.get("kakao_account").get("email") != null) ?
                    jsonNode.get("kakao_account").get("email").asText() : null;

            // 이메일 정보가 없으면 예외 발생시킴
            if (email==null) {
                throw new IllegalStateException("이메일 정보가 없습니다. 이메일은 필수 동의 항목입니다.");
            }

//            System.out.println("email: " + email);
            return new KakaoLoginRes(email);
        }catch (Exception e){
           throw new KakaoGetMemberException(e);

        }
    }

    /**
     * refreshToken 검증 (유효하지 않다면 새로운 accessToken 발급)
     * @param refreshToken
     * @return
     * @throws Exception
     */
    public String generateNewAccessToken(String refreshToken) throws Exception {
        // refreshToken의 유효성 검증.
        if (jwtTokenProvider.validateToken(refreshToken)==1) {
            throw new IllegalArgumentException("리프레시 토큰이 유효하지 않습니다.");
        }

        // refreshToken에서 사용자 이메일 추출.
        String email = jwtTokenProvider.getEmailFromToken(refreshToken);

        // 사용자 이메일로 사용자 정보를 불러옴.
        try{
            userDetailsService.loadUserByUsername(email);
        }catch (Exception e){
            // 사용자가 존재하지 않으면 MemberNotFoundException 발생시킴.
            throw new MemberNotFoundException(e);
        }

        // 새로운 accessToken을 생성합니다.
        return jwtTokenProvider.createAccessToken(email);
    }
}
