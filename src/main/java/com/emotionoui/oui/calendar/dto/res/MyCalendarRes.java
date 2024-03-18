package com.emotionoui.oui.calendar.dto.res;

import com.emotionoui.oui.calendar.entity.Emotion;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Builder
public class MyCalendarRes {

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


    public static MyCalendarRes of(Emotion emotion) {

        List<ScheduleDto> temp = emotion.getMember().getScheduleList().stream()
                .map(schedule -> ScheduleDto.builder()
                        .title(schedule.getTitle())
                        .content((schedule.getContent()))
                        .build())
                .collect(Collectors.toList());


        return MyCalendarRes.builder()
                .memberId(emotion.getMember().getMemberId())
                .dailyDiaryId(emotion.getDailyDiary().getId())
                .date(emotion.getDate())
                .emotion(emotion.getEmotion())
                .scheduleList(temp)
                .build();
    }

}
