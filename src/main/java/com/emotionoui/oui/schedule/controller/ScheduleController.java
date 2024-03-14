package com.emotionoui.oui.schedule.controller;


import com.emotionoui.oui.schedule.dto.ScheduleRequest;
import com.emotionoui.oui.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<?> writeSchedules(@RequestBody ScheduleRequest scheduleRequest) {

        int sceduleId = scheduleService.writeSchedules(scheduleRequest);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{scheduleId}")
                .buildAndExpand(sceduleId)
                .toUri();
        return ResponseEntity.created(location).build();
    }
}
