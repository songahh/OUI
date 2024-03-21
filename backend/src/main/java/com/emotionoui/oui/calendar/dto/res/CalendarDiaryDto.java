package com.emotionoui.oui.calendar.dto.res;

import com.emotionoui.oui.calendar.entity.Emotion;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.time.LocalDate;
import java.time.ZoneId;


@Builder
public class CalendarDiaryDto {

    @JsonProperty("member_id")
    private Integer memberId;

    @JsonProperty("daily_diary_id")
    private Integer dailyDiaryId;

    @JsonProperty("date")
    private String date;

    @JsonProperty("emotion")
    private String emotion;



    public static CalendarDiaryDto of(Emotion emotion) {

        LocalDate localDate = LocalDate.ofInstant(emotion.getDate().toInstant(), ZoneId.systemDefault());
        return CalendarDiaryDto.builder()
                .memberId(emotion.getMember().getMemberId())
                .dailyDiaryId(emotion.getDailyDiary().getId())
                .date(localDate.toString())
                .emotion(emotion.getEmotion())
                .build();

    }


    @Override
    public String toString() {
        return "DiaryDto{" +
                "memberId=" + memberId +
                ", dailyDiaryId=" + dailyDiaryId +
                ", date=" + date +
                ", emotion='" + emotion + '\'' +
                '}';
    }
}
