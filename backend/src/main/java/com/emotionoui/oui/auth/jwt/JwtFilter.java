package com.emotionoui.oui.auth.jwt;

import com.emotionoui.oui.auth.exception.MemberNotFoundException;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;

    public JwtFilter(JwtTokenProvider jwtTokenProvider, JwtUtil jwtUtil, MemberRepository memberRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.jwtUtil = jwtUtil;
        this.memberRepository = memberRepository;
    }

    /**
     * 헤더에 담겨 온 accessToken으로 사용자 정보 생성
     * @param request
     * @param response
     * @param filterChain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

        System.out.println("여기가 필터 시작부분");
        String requestURI = request.getRequestURI();

        String token = jwtTokenProvider.resolveToken(request);

        // 로그인 페이지의 경로와 일치할 경우 필터링 과정을 건너뜁니다.
        if (("/auth/token".equals(requestURI) || "/auth/login/kakao".equals(requestURI) || "/login".equals(requestURI))) {
            System.out.println("로그인 화면으로 갈 때..");
            filterChain.doFilter(request, response);
            return;
        }

System.out.println("JwtFilter.doFilter - 쿠키에 담겨 온 accessToken : "+token);
        // 토큰이 존재하고, 유효하다면
        if (token != null && jwtTokenProvider.validateToken(token)) {
            Authentication auth = jwtTokenProvider.getAuthentication(token);
System.out.println("JwtFilter.doFilter - member의 정보 : "+ auth);
            //토큰에서 email 획득
            String email = jwtUtil.getEmail(token);
System.out.println("JwtFilter.doFilter - email: "+email);

            //member를 생성하여 값 set
            Member member;
            try{
                member = memberRepository.findByEmail(email).orElseThrow(Exception::new);
                System.out.println("JwtFilter.doFilter - nickname : "+member.getNickname());
                System.out.println("JwtFilter.doFilter - regdate : "+member.getRegdate());

                //스프링 시큐리티 인증 토큰 생성
                Authentication authToken = new UsernamePasswordAuthenticationToken(member, null, member.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }catch (Exception e){
                throw new MemberNotFoundException(e);
            }

        }
        else{ // 엑세스 토큰이 존재하지 않거나, 만료되었다면 401 unAthorized
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 상태 코드 설정
            httpResponse.getWriter().write("accessToken is not valid!!!");
            return;
        }
        filterChain.doFilter(request, response);
    }
}