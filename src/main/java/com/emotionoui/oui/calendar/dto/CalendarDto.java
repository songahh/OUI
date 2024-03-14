package com.emotionoui.oui.calendar.dto;

import com.emotionoui.oui.calendar.entity.Emotion;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Builder
public class CalendarDto {

    @JsonProperty("member_id")
    private Integer memberId;

    @JsonProperty("daily_diary_id")
    private Integer dailyDiaryId;

    @JsonProperty("date")
    private LocalDateTime date;

    @JsonProperty("emotion")
    private String emotion;

    @JsonProperty("schedule")
    private List<ScheduleDto> scheduleList;


    public static CalendarDto of(Emotion emotion) {

        List<ScheduleDto> temp = emotion.getMember().getScheduleList().stream()
                .map(schedule -> ScheduleDto.builder()
                        .title(schedule.getTitle())
                        .content((schedule.getContent()))
                        .build())
                .collect(Collectors.toList());


        return CalendarDto.builder()
                .memberId(emotion.getMember().getId())
                .dailyDiaryId(emotion.getDailyDiary().getId())
                .date(emotion.getDate())
                .emotion(emotion.getEmotion())
                .scheduleList(temp)
                .build();
    }

}
