package com.emotionoui.oui.calendar.dto.res;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.util.ArrayList;
import java.util.Date;

@Builder
public class CalendarDailyDiaryRes {

    @JsonProperty("diary_id")
    private Integer diaryId;

    @JsonProperty("date")
    private Date date;

    @JsonProperty("daily_diaries")
    private ArrayList<CalendarDailyDiaryRes> calendarDailyDiaryResList;
}
