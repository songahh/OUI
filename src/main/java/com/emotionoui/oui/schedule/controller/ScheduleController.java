package com.emotionoui.oui.schedule.controller;


import com.emotionoui.oui.schedule.dto.ScheduleReq;
import com.emotionoui.oui.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/my")
    public ResponseEntity<?> saveSchedules(@RequestBody ScheduleReq scheduleReq) {

        int memberId = scheduleService.saveSchedules(scheduleReq);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
