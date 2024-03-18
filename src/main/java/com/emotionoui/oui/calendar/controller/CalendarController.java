package com.emotionoui.oui.calendar.controller;


import com.emotionoui.oui.calendar.dto.req.MyCalendarReq;
import com.emotionoui.oui.calendar.dto.res.MyCalendarRes;
import com.emotionoui.oui.calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/my")
    public ResponseEntity<?> searchMyCalendar(@RequestParam(name="date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date){

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        Integer year = calendar.get(Calendar.YEAR);
        Integer month = calendar.get(Calendar.MONTH);

        List<MyCalendarRes> myCalendar = calendarService.findByMyCalendar(1, 2024, 3);
        return new ResponseEntity<>(myCalendar, HttpStatus.OK);

    }
}
