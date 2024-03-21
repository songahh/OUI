package com.emotionoui.oui.main.controller;

import com.emotionoui.oui.diary.entity.Diary;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.entity.MemberDiary;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/main")
public class MainController {

    /**
     * 모든 다이어리 가져오기
     * @param member
     * @return
     */
    @GetMapping
    public ResponseEntity<List<MemberDiary>> getDiaries(@AuthenticationPrincipal Member member){
        // 우선사용자의 정보 가져오기
        int memberId =member.getMemberId();
        // 반환할 리스트
        List<MemberDiary> memberDiaries = new ArrayList<>();
        // MemberDiary 테이블에서 memberId에 해당하는 diaryId 찾아서 diary테이블에서 diaryId에 해당하는 다이어리 정보 가져오기


        return null;
    }
}