package com.emotionoui.oui.main.controller;

import com.emotionoui.oui.diary.entity.Diary;
import com.emotionoui.oui.member.entity.Member;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/main")
public class MainController {

    @GetMapping
    public ResponseEntity<List<Diary>> getDiaries(@AuthenticationPrincipal Member member){
        String memberEmail=member.getEmail();
//        List<>

        return null;
    }
}

//200,
//diaryList: [{
//diaryId: int,
//diaryName: String,
//memberId: int,
//공유/개인: enum,
//templateId: int,
//createdAt: LocalDateTime,
//orders: int,
//        }]
//