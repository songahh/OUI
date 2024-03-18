package com.emotionoui.oui.auth.service;

import com.emotionoui.oui.auth.dto.CustomUserDetails;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    // 사용자 정보를 조회하는 로직 구현
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (!optionalMember.isPresent()) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email);
        }
        Member member = optionalMember.get();

        CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.setEmail(member.getEmail()); // 이메일을 사용자 이름으로 사용
        customUserDetails.setPassword(member.getPassword());
        customUserDetails.setNickname(member.getNickname());

        return customUserDetails;
    }
}

