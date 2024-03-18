package com.emotionoui.oui.auth.controller;

import com.emotionoui.oui.auth.dto.res.KakaoLoginRes;
import com.emotionoui.oui.auth.jwt.JwtTokenProvider;
import com.emotionoui.oui.auth.service.AuthService;
import com.emotionoui.oui.member.dto.Member;
import com.emotionoui.oui.member.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class KakaoController {

    @Autowired
    private MemberRepository memberRepository;
    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * kakao에서 email 정보 받아오기
     * @param code
     * @param response
     * @return
     * @throws JsonProcessingException
     */
    @GetMapping("/login/kakao")
    public ResponseEntity<String> kakaoLogin(@RequestParam String code, HttpServletResponse response) throws JsonProcessingException {
        String msg = "성공적으로 카카오 로그인 API 코드를 불러왔습니다.";
        // 카카오에서 사용자 email 받아오기
        KakaoLoginRes kakaoLoginRes = authService.kakaoLogin(code, response);
        // 받아온 email로 jwt access, refresh 토큰 만들기
        String accessToken = jwtTokenProvider.createAccessToken(kakaoLoginRes.getEmail());
        String refreshToken = jwtTokenProvider.createRefreshToken(kakaoLoginRes.getEmail());
        System.out.println(accessToken);
        System.out.println(refreshToken);
        // accesstoken, refreshToken 쿠키에 담기
        jwtTokenProvider.createAccessTokenCookie(accessToken, response);
        jwtTokenProvider.createRefreshTokenCookie(refreshToken, response);
        //헤더에 accessToken 담기

        // 가입된 유저 확인 & 회원가입
        System.out.println(kakaoMemberCheckAndRegister(kakaoLoginRes));

        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    // #3.  가입된 유저확인 & 회원가입
    private String kakaoMemberCheckAndRegister(KakaoLoginRes kakaoLoginRes) {

        String email = kakaoLoginRes.getEmail();
        // 나중에 랜덤으로 던져줘야 함
        String memberNickname = "싸피다람쥐";
        LocalDateTime regdate = LocalDateTime.now();

        Member kakaoMember = memberRepository.findByEmail(email).orElse(null);

        // 가입되지 않은 회원이라면 회원가입
        if(kakaoMember == null) {
            kakaoMember = new Member(email, memberNickname, regdate);
            memberRepository.save(kakaoMember);
            return "새로운 회원이므로 회원가입";
        }
        return "이미 가입된 회원이므로 자동로그인 진행";
    }

    /**
     * 리프레시 토큰 만료 검사 후 만료되었으면 액세스 토큰 발급
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        // 쿠키에서 refresh token 추출
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        System.out.println("cookies: "+request.getCookies().toString());
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                    break; // refreshToken을 찾았으므로 반복 종료
                }
            }
        }

        if (refreshToken == null) {
            return ResponseEntity.badRequest().body("Refresh token is missing");
        }

        // refreshToken 검증 및 새로운 accessToken 생성 로직
        try {
            // authService의 generateNewAccessToken 메서드를 호출하여 새로운 accessToken을 얻습니다.
            String newAccessToken = authService.generateNewAccessToken(refreshToken);

            // 새로운 accessToken을 쿠키에 담아서 반환하는 메소드를 호출합니다.
            jwtTokenProvider.createAccessTokenCookie(newAccessToken, response);

            // 성공적으로 새로운 accessToken을 생성하고 쿠키에 담았으니, 상태 메시지만 응답 본문에 포함하여 반환
            return ResponseEntity.ok().body("New access token has been issued and set in cookie.");
        } catch (Exception e) {
            // refreshToken이 유효하지 않거나 처리 중 오류가 발생한 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }

}

