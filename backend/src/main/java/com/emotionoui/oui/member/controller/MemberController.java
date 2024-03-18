package com.emotionoui.oui.member.controller;

import com.emotionoui.oui.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {

    /**
     * 회원정보 가져오기
     * @param member
     * @return
     */
    @GetMapping
    public ResponseEntity<Member> getMember(@AuthenticationPrincipal Member member){

        Member member1 = Member.builder()
                .email(member.getEmail())
                .memberId(member.getMemberId())
                .img(member.getImg())
                .regdate(member.getRegdate())
                .nickname(member.getNickname())
            .build();

        return new ResponseEntity<>(member1, HttpStatus.OK);
    }
}
