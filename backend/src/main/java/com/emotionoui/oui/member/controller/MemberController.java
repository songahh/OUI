package com.emotionoui.oui.member.controller;

import com.emotionoui.oui.member.dto.req.FindMemberReq;
import com.emotionoui.oui.member.dto.req.UpdateMemberReq;
import com.emotionoui.oui.member.dto.res.SearchMemberRes;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
@Slf4j
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
        String searchedMember= memberService.findMember(member, findMemberReq);
        return ResponseEntity.ok(searchedMember);
    }

    /**
     * 회원 정보 수정
     * @param member
     * @return
     */
    @PutMapping(consumes = "multipart/form-data")
    public ResponseEntity<Void> updateMember(@AuthenticationPrincipal Member member,
         @RequestPart(required = false) MultipartFile file, @RequestParam String memberNickname){
        UpdateMemberReq updateMemberReq;
        if(file == null){
            updateMemberReq = new UpdateMemberReq(memberNickname);
        }
        else{
            updateMemberReq = new UpdateMemberReq(memberNickname, file);
        }
        memberService.updateMember(member, updateMemberReq);
        return ResponseEntity.ok().build();
    }

}


