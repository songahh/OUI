package com.emotionoui.oui.schedule.dto;


import com.emotionoui.oui.schedule.entity.Schedule;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public class ScheduleRes {

    @JsonProperty("member_id")
    private Integer memberId;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    @JsonProperty("date")
    private LocalDate date;

    public ScheduleRes of(Schedule schedule){

        return  ScheduleRes.builder()
                .memberId(schedule.getMember().getId())
                .title(schedule.getTitle())
                .content(schedule.getContent())
                .date(schedule.getDate())
                .build();
    }
}
