package com.emotionoui.oui.calendar.dto.res;


import com.emotionoui.oui.schedule.entity.Schedule;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public class CalendarScheduleDto {

    @JsonProperty("schedule_id")
    private  Integer scheduleId;

    @JsonProperty("member_id")
    private Integer memberId;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    @JsonProperty("date")
    private LocalDate date;

    public static CalendarScheduleDto of(Schedule schedule){

        return  CalendarScheduleDto.builder()
                .scheduleId(schedule.getScheduleId())
                .memberId(schedule.getMember().getMemberId())
                .title(schedule.getTitle())
                .content(schedule.getContent())
                .date(schedule.getDate())
                .build();
    }
}
