package com.emotionoui.oui.diary.dto.req;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class CreateDailyDiaryReq {
    // 다이어리 ID
    private Integer diaryId;
    // 일기 내용
    private String dailyContent;
    // 일기 날짜
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dailyDate;
}