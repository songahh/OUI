package com.emotionoui.oui.main.controller;

import com.emotionoui.oui.main.dto.res.SearchDiaryListRes;
import com.emotionoui.oui.main.service.MainService;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.querydsl.DiaryRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
public class MainController {

    private final DiaryRepositoryCustom diaryRepositoryCustom;
    private final MainService mainService;
    /**
     * 모든 다이어리 가져오기
     *
     * @param member
     * @return
     */
    @GetMapping
    public ResponseEntity<List<SearchDiaryListRes>> getDiaries(@AuthenticationPrincipal Member member){
        List<SearchDiaryListRes> memberDiaries = diaryRepositoryCustom.findDiariesByMemberId(member.getMemberId());
        return ResponseEntity.ok(memberDiaries);
    }

    /**
     * 공유다이어리 생성
     * @param member
     * @return
     */
    @PostMapping("/diary")
    public ResponseEntity<List<Integer>> createShareDiary(@AuthenticationPrincipal Member member){
        List<Integer> memberList = null;
        return ResponseEntity.ok(memberList);
    }
}