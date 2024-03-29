package com.emotionoui.oui.calendar.dto.res;

import com.emotionoui.oui.diary.entity.DailyDiary;
import com.emotionoui.oui.diary.entity.DailyDiaryCollection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
@AllArgsConstructor
public class ShareDailyDiaryRes {

    // 몽고디비 일기 ID
    private String dailyDiaryId;
    // 일기 작성자 ID
    private Integer writerId;
    // 다이어리 ID
    private Integer diaryId;
    // 일기 내용
    private String dailyContent;
    // 일기 꾸미기 내용
    private String decoration;
    // 일기 날짜
    private String dailyDate;

    public static ShareDailyDiaryRes of(DailyDiaryCollection collection, DailyDiary dailyDiary) {
        return ShareDailyDiaryRes.builder()
                .dailyDiaryId(collection.getId().toString())
                .writerId(collection.getMemberId())
                .diaryId(collection.getDiaryId())
                .dailyContent(collection.getContent())
                .decoration(collection.getDecoration())
                .dailyDate(dailyDiary.getDailyDate().toString())
                .build();
    }
}
