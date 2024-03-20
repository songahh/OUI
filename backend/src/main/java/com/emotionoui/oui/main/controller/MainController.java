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
        String memberEmail=member.getEmail();
        List<MemberDiary> memberDiaries = new ArrayList<>();


        return null;
    }
}