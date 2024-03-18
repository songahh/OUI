package com.emotionoui.oui.schedule.controller;


import com.emotionoui.oui.schedule.dto.req.ScheduleReq;
import com.emotionoui.oui.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/my/{scheduleId}")
    public ResponseEntity<?> updateSchedule(@RequestBody ScheduleReq scheduleReq,
                                            @PathVariable(value= "scheduleId") Integer scheduleId){
        scheduleService.updateSchedules(scheduleId, scheduleReq);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/my/{scheduleId}/delete")
    public ResponseEntity<?> deleteSchedule(@RequestBody ScheduleReq scheduleReq,
                                            @PathVariable(value= "scheduleId") Integer scheduleId){
        scheduleService.deleteSchedules(scheduleId, scheduleReq);
        return ResponseEntity.noContent().build();
    }
}
