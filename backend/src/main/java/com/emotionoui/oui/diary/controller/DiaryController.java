package com.emotionoui.oui.diary.controller;

import com.emotionoui.oui.diary.dto.EmotionClass;
import com.emotionoui.oui.diary.dto.req.CreateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.UpdateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.res.SearchDailyDiaryRes;
import com.emotionoui.oui.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Slf4j
@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    // , @AuthenticationPrincipal Member member
    // 일기 게시글 작성하기
    @PostMapping
    public ResponseEntity<?> createDailyDiary(@RequestBody CreateDailyDiaryReq req) throws IOException, ExecutionException, InterruptedException {
        // 작성자가 필요함
        return new ResponseEntity<String>(diaryService.createDailyDiary(req), HttpStatus.OK);
    }

    // 일기 게시글 수정하기
    @PutMapping("/{dailyId}")
    public ResponseEntity<?> updateDailyDiary(@RequestBody UpdateDailyDiaryReq req, @PathVariable Integer dailyId){
        return new ResponseEntity<Integer>(diaryService.updateDailyDiary(req, dailyId), HttpStatus.OK);
    }

    // 일기 게시글 삭제하기
    @PutMapping("/delete/{dailyId}")
    public ResponseEntity<?> deleteDailyDiary(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 일기 게시글 조회하기
    @GetMapping("/{dailyId}")
    public ResponseEntity<?> searchDailyDiary(@PathVariable Integer dailyId){
        return new ResponseEntity<SearchDailyDiaryRes>(diaryService.searchDailyDiary(dailyId), HttpStatus.OK);
    }

    // 감정분석 결과 보여주기
    @GetMapping("/emotion/{dailyId}")
    public ResponseEntity<?> searchEmotion(@PathVariable Integer dailyId){
        return new ResponseEntity<EmotionClass>(diaryService.searchEmotion(dailyId), HttpStatus.OK);
    }

    // 추천노래 보여주기
    @GetMapping("/music/{dailyId}")
    public ResponseEntity<?> searchMusic(@PathVariable Integer dailyId){
        return new ResponseEntity<List<String>>(diaryService.searchMusic(dailyId), HttpStatus.OK);
    }

    // AI 코멘트 보여주기
    @GetMapping("/comment/{dailyId}")
    public ResponseEntity<?> searchComment(@PathVariable Integer dailyId){
        return new ResponseEntity<String>(diaryService.searchComment(dailyId), HttpStatus.OK);
    }
}