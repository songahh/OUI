package com.emotionoui.oui.calendar.controller;


import com.emotionoui.oui.calendar.dto.res.*;
import com.emotionoui.oui.calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    // 캘린더에서 한달간 내 일기와 일정 조회
    @GetMapping("/my")
    public ResponseEntity<?> searchMyCalendar(@RequestParam(name="date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date){

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        Integer year = calendar.get(Calendar.YEAR);
        Integer month = calendar.get(Calendar.MONTH);

        List<CalendarDiaryDto> myDiaries = calendarService.findCalendarbyDate(1, year, month);
        List<CalendarScheduleDto> myScehdule = calendarService.findMySchedulebyDate(1, year, month);

        MyCalendarRes myCalendarRes = MyCalendarRes.builder()
                .diaries(myDiaries)
                .schedules(myScehdule)
                .build();

        return new ResponseEntity<>(myCalendarRes, HttpStatus.OK);

    }

    // 공유일기에서 한달간 모든 인원의 일기와 일정 조회
    @GetMapping("{diaryId}")
    public ResponseEntity<?> searchShareCalendar(@RequestParam(name="date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
                                                 @PathVariable(value= "diaryId") Integer diaryId){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        Integer year = calendar.get(Calendar.YEAR);
        Integer month = calendar.get(Calendar.MONTH);

        ArrayList<MyCalendarRes> calendars = new ArrayList<>();

        // findmemberbyId 로 멤버 다 찾고 for문 돌리면서 shareCalendarRes의 calendarResList에 넣기
        List<Integer> tmpMember = new ArrayList<>();
        tmpMember.add(1);
        tmpMember.add(2);

        for(Integer i : tmpMember){
            List<CalendarDiaryDto> myDiaries = calendarService.findCalendarbyDate(i, year, month);
            List<CalendarScheduleDto> myScehdule = calendarService.findMySchedulebyDate(i, year, month);

            MyCalendarRes myCalendarRes = MyCalendarRes.builder()
                    .diaries(myDiaries)
                    .schedules(myScehdule)
                    .build();

            calendars.add(myCalendarRes);
        }

        ShareCalendarRes shareCalendarRes = ShareCalendarRes.builder()
                .diaryId(diaryId)
                .date(date)
                .calendarResList(calendars)
                .build();

        return new ResponseEntity<>(shareCalendarRes, HttpStatus.OK);
    }

//    @GetMapping("{diaryId}/day")
//    public ResponseEntity<?> searchDailyDiary(@PathVariable(value= "diaryId") Integer diaryId,
//                                              @RequestParam(name="date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date){
//
//        ArrayList<MyCalendarRes> dailyDiaries = new ArrayList<>();
//
//        // findmemberbyId 로 멤버 다 찾고 for문 돌리면서 shareCalendarRes의 calendarResList에 넣기
//        List<Integer> tmpMember = new ArrayList<>();
//        tmpMember.add(1);
//        tmpMember.add(2);
//
//        for(Integer i : tmpMember){
//            List<CalendarDailyDiaryRes> dailyDiaries = calendarService.find(i, date);
//
//
//        }
//
//
//        CalendarDailyDiaryRes calendarDailyDiaryRes = CalendarDailyDiaryRes.builder()
//                .build();
//
//        return new ResponseEntity<>(calendarDailyDiaryRes, HttpStatus.OK);
//    }
}
