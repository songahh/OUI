package com.emotionoui.oui.member.controller;

import com.emotionoui.oui.member.dto.req.FindMemberReq;
import com.emotionoui.oui.member.dto.res.SearchMemberRes;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    /**
     * 회원정보 가져오기
     * @param member
     * @return
     */
    @GetMapping
    public ResponseEntity<SearchMemberRes> getMember(@AuthenticationPrincipal Member member){
        // 만약 탈퇴한 회원이라면 예외처리
        SearchMemberRes searchMemberRes = memberService.getMember(member);
        return ResponseEntity.ok(searchMemberRes);
    }

    /**
     * 공유 다이어리에 추가할 멤버 검색
     * @param findMemberReq
     * @return 추가할 memberEmail
     */
    @GetMapping("/search")
    public ResponseEntity<String> searchMember(@AuthenticationPrincipal Member member, @RequestBody FindMemberReq findMemberReq){
        String creatorEmail = member.getEmail();
        String searchedMember= memberService.searchMember(creatorEmail, findMemberReq);
        return ResponseEntity.ok(searchedMember);
    }
}
