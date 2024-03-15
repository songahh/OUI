package com.emotionoui.oui.calendar.dto;


import com.emotionoui.oui.calendar.entity.Emotion;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class EmotionDto {

    @JsonProperty("member_id")
    private Integer memberId;

    @JsonProperty("daily_diary_id")
    private Integer dailyDiaryId;

    @JsonProperty("date")
    private LocalDateTime date;

    @JsonProperty("emotion")
    private String emotion;

    public EmotionDto of(Emotion emotion){

        return  EmotionDto.builder()
                .memberId(emotion.getMember().getId())
                .dailyDiaryId(emotion.getDailyDiary().getId())
                .date(emotion.getDate())
                .emotion(emotion.getEmotion())
                .build();
    }
}
