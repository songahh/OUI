package com.emotionoui.oui.calendar.dto.res;


import com.emotionoui.oui.schedule.entity.Schedule;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.time.LocalDate;
import java.time.ZoneId;

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
    private String date;

    @JsonProperty("color")
    private String color;

    public static CalendarScheduleDto of(Schedule schedule){

        LocalDate localDate = LocalDate.ofInstant(schedule.getDate().toInstant(), ZoneId.systemDefault());

        return  CalendarScheduleDto.builder()
                .scheduleId(schedule.getScheduleId())
                .memberId(schedule.getMember().getMemberId())
                .title(schedule.getTitle())
                .content(schedule.getContent())
                .date(localDate.toString())
                .color(schedule.getColor())
                .build();
    }

    @Override
    public String toString() {
        return "ScheduleDto{" +
                "scheduleId=" + scheduleId +
                ", memberId=" + memberId +
                ", title=" + title +
                ", content=" + content +
                ", date=" + date + '\'' +
                '}';
    }
}
