package com.emotionoui.oui.member.controller;

import com.emotionoui.oui.member.dto.Member;
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
    @GetMapping("/email")
    public ResponseEntity<Member> getMemberEmail(@AuthenticationPrincipal Member member){
        System.out.println(member.getMemberId());

        return new ResponseEntity<>(member, HttpStatus.OK);
    }
}
//memberId: int
//memberEmail: String
//memberNickname: String
//memberPassword: String
//regDate: LocalDateTime,
//memberImg: file
//}