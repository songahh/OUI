package com.emotionoui.oui.calendar.dto.res;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.util.Date;
import java.util.List;
@Builder
public class MyCalendarRes {

    @JsonProperty("diaries")
    private List<CalendarDiaryDto> diaries;

    @JsonProperty("schedules")
    private List<CalendarScheduleDto> schedules;

//    @Builder
//    MyCalendarRes(List<CalendarDiaryDto> diaries, List<CalendarScheduleDto> schedules){
//        this.diaries = diaries;
//        this.schedules = schedules;
//    }
    public static MyCalendarRes of(List<CalendarDiaryDto> diaries, List<CalendarScheduleDto> schedules){
        return MyCalendarRes.builder()
                .diaries(diaries)
                .schedules(schedules)
                .build();
    }
}
