package com.emotionoui.oui.diary.controller;

import com.emotionoui.oui.diary.dto.EmotionClass;
import com.emotionoui.oui.diary.dto.req.CreateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.DecorateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.UpdateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.UpdateDiarySettingReq;
import com.emotionoui.oui.diary.dto.res.SearchDailyDiaryRes;
import com.emotionoui.oui.diary.dto.res.SearchDiarySettingRes;
import com.emotionoui.oui.diary.entity.Diary;
import com.emotionoui.oui.diary.exception.NotExitPrivateDiaryException;
import com.emotionoui.oui.diary.repository.DiaryRepository;
import com.emotionoui.oui.diary.service.DiaryService;
import com.emotionoui.oui.member.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Slf4j
@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final DiaryRepository diaryRepository;

    // , @AuthenticationPrincipal Member member
    // 일기 게시글 작성하기
    @PostMapping
    public ResponseEntity<?> createDailyDiary(@RequestBody CreateDailyDiaryReq req, @AuthenticationPrincipal Member member) throws IOException, ExecutionException, InterruptedException {
        return new ResponseEntity<String>(diaryService.createDailyDiary(req, member), HttpStatus.OK);
    }

    // 일기 게시글 수정하기
    @PutMapping("/{dailyId}")
    public ResponseEntity<?> updateDailyDiary(@RequestBody UpdateDailyDiaryReq req, @PathVariable("dailyId") Integer dailyId){
        return new ResponseEntity<Integer>(diaryService.updateDailyDiary(req, dailyId), HttpStatus.OK);
    }

    // 일기 게시글 삭제하기
    @PutMapping("/delete/{dailyId}")
    public ResponseEntity<?> deleteDailyDiary(@PathVariable("dailyId") Integer dailyId){
        diaryService.deleteDailyDiary(dailyId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 일기 게시글 조회하기
    @GetMapping("/{dailyId}")
    public ResponseEntity<?> searchDailyDiary(@PathVariable("dailyId") Integer dailyId){
        return new ResponseEntity<SearchDailyDiaryRes>(diaryService.searchDailyDiary(dailyId), HttpStatus.OK);
    }

    // 감정분석 결과 보여주기
    @GetMapping("/emotion/{dailyId}")
    public ResponseEntity<?> searchEmotion(@PathVariable("dailyId") Integer dailyId){
        return new ResponseEntity<EmotionClass>(diaryService.searchEmotion(dailyId), HttpStatus.OK);
    }

    // 추천노래 보여주기
    @GetMapping("/music/{dailyId}")
    public ResponseEntity<?> searchMusic(@PathVariable("dailyId") Integer dailyId){
        return new ResponseEntity<List<String>>(diaryService.searchMusic(dailyId), HttpStatus.OK);
    }

    // AI 코멘트 보여주기
    @GetMapping("/comment/{dailyId}")
    public ResponseEntity<?> searchComment(@PathVariable("dailyId") Integer dailyId){
        return new ResponseEntity<String>(diaryService.searchComment(dailyId), HttpStatus.OK);
    }

    // 다이어리 설정 조회하기
    @GetMapping("/setting/{diaryId}")
    public ResponseEntity<?> searchDiarySetting(@PathVariable("diaryId") Integer diaryId, @AuthenticationPrincipal Member member){
        Integer memberId = member.getMemberId();
        return new ResponseEntity<SearchDiarySettingRes>(diaryService.searchDiarySetting(diaryId, memberId), HttpStatus.OK);
    }

    // 다이어리 설정 수정하기
    @PutMapping("/setting/{diaryId}")
    public ResponseEntity<?> updateDiarySetting(@RequestBody UpdateDiarySettingReq req, @PathVariable("diaryId") Integer diaryId, @AuthenticationPrincipal Member member){
        Integer memberId = member.getMemberId();
        diaryService.updateDiarySetting(req, diaryId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 일기 꾸미기
    @PostMapping("/decorate/{dailyId}")
    public ResponseEntity<?> decorateDailyDiary(@RequestBody DecorateDailyDiaryReq req, @PathVariable("dailyId") Integer dailyId) throws IOException, ExecutionException, InterruptedException {
        return new ResponseEntity<String>(diaryService.decorateDailyDiary(req, dailyId), HttpStatus.OK);
    }

    // 다이어리 나가기
    @Transactional
    @PutMapping("/{diaryId}/delete")
    public ResponseEntity<?> exitShareDiary(@PathVariable("diaryId") Integer diaryId, @AuthenticationPrincipal Member member){
        // 공유 다이어리인지 확인
        Optional<Diary> diary = diaryRepository.findById(diaryId);
        if(!diary.get().getType().equals("공유")){
            throw new NotExitPrivateDiaryException();
        }
        diaryService.exitShareDiary(diaryId, member.getMemberId());
        return ResponseEntity.ok().build();
    }

}