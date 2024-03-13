package com.emotionoui.oui.calendar.dto;


import com.emotionoui.oui.calendar.entity.DailyDiary;
import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.calendar.entity.Member;
import com.emotionoui.oui.calendar.entity.Schedule;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Date;

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
