package com.emotionoui.oui.calendar.controller;


import com.emotionoui.oui.calendar.dto.CalendarDto;
import com.emotionoui.oui.calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<?> searchMyCalendar(@RequestParam(name="date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime date){

        LocalDateTime monthYear = LocalDateTime.of(date.getYear(), date.getMonth(), 1, 0, 0);

        List<CalendarDto> calendar = calendarService.findByMyCalendar(1, monthYear);
        return new ResponseEntity<>(calendar, HttpStatus.OK);

    }
}
