package com.emotionoui.oui.diary.dto.req;

import lombok.Data;

@Data
public class UpdateDailyDiaryReq {
    // 일기 ID
    private String dailyDiaryId;
    // 다이어리 ID
    private Integer diaryId;
    // 일기 내용
    private String dailyContent;
}
