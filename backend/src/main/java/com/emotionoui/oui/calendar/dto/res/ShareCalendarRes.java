package com.emotionoui.oui.calendar.dto.res;


import com.emotionoui.oui.calendar.dto.res.MyCalendarRes;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Builder
public class ShareCalendarRes {

    @JsonProperty("diary_id")
    private Integer diaryId;

    @JsonProperty("date")
    private Date date;

    @JsonProperty("members")
    private ArrayList<MyCalendarRes> calendarResList;


}
