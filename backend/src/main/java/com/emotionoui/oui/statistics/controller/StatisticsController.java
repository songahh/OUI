package com.emotionoui.oui.statistics.controller;

import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.statistics.dto.req.MyMonthlyEmotionReq;
import com.emotionoui.oui.statistics.dto.req.MyWeeklyEmotionReq;
import com.emotionoui.oui.statistics.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/my/month")
    public ResponseEntity<?> getMyMonthEmotion(MyMonthlyEmotionReq req){

        int month = req.getDate().getMonth().getValue();
        int year = req.getDate().getYear();
        Integer diaryId = req.getDiaryId();
        HashMap<String, Integer> emotions =statisticsService.getMyMonth(diaryId,year,month);

        return new ResponseEntity<>(emotions,HttpStatus.OK);
    }

    @GetMapping("/my/week")
    public ResponseEntity<?> getMyWeekEmotion(MyWeeklyEmotionReq req){
        System.out.println("req.getDate() = " + req.getDate());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
