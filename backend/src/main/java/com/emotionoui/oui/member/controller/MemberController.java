package com.emotionoui.oui.member.controller;

import com.emotionoui.oui.member.dto.req.FindMemberReq;
import com.emotionoui.oui.member.dto.req.UpdateMemberReq;
import com.emotionoui.oui.member.dto.res.SearchMemberRes;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    /**
     * 회원 정보 가져오기
     * @param member
     * @return
     */
    @GetMapping
    public ResponseEntity<SearchMemberRes> searchMember(@AuthenticationPrincipal Member member){
        SearchMemberRes searchMemberRes = memberService.searchMember(member);
        return ResponseEntity.ok(searchMemberRes);
    }

    /**
     * 공유 다이어리에 추가할 멤버 검색
     * @param findMemberReq
     * @return 추가할 memberEmail
     */
    @GetMapping("/search")
    public ResponseEntity<String> findMember(@AuthenticationPrincipal Member member, FindMemberReq findMemberReq){
        String creatorEmail = member.getEmail();
        System.out.println("creatorEmail = " + creatorEmail);
        String searchedMember= memberService.findMember(creatorEmail, findMemberReq);
        return new ResponseEntity<>(searchedMember,HttpStatus.OK);
    }

    /**
     * 회원 정보 수정
     * @param member
     * @return
     */
    @PutMapping
    public ResponseEntity<Void> updateMember(@AuthenticationPrincipal Member member, UpdateMemberReq updateMemberReq){
        System.out.println(updateMemberReq.getImgUrl());
        memberService.updateMember(member, updateMemberReq);
        return ResponseEntity.ok().build();
    }

}


