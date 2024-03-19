package com.emotionoui.oui.calendar.dto.res;

import com.emotionoui.oui.calendar.entity.Emotion;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.util.Date;

@Builder
public class CalendarDiaryDto {

    @JsonProperty("member_id")
    private Integer memberId;

    @JsonProperty("daily_diary_id")
    private Integer dailyDiaryId;

    @JsonProperty("date")
    private Date date;

    @JsonProperty("emotion")
    private String emotion;



    public static CalendarDiaryDto of(Emotion emotion) {

        return CalendarDiaryDto.builder()
                .memberId(emotion.getMember().getMemberId())
                .dailyDiaryId(emotion.getDailyDiary().getId())
                .date(emotion.getDate())
                .emotion(emotion.getEmotion())
                .build();
    }

}
