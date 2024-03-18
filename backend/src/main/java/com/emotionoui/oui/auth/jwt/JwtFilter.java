package com.emotionoui.oui.auth.jwt;

import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

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
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
System.out.println("JwtFilter.doFilter - 헤더에 담겨 온 accessToken : "+token);

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
            }catch (Exception e){
                System.out.println("member 못만듦");
                return;
            }

            //스프링 시큐리티 인증 토큰 생성
            Authentication authToken = new UsernamePasswordAuthenticationToken(member, null, member.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authToken);
        // 엑세스 토큰이 만료되었다면 리프레시 토큰 요청
        }else{
            System.out.println("만료된 토큰이야!");
        }


        filterChain.doFilter(request, response);
    }
}
