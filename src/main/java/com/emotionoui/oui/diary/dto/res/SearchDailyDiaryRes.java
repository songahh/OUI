package com.emotionoui.oui.diary.dto.res;

import com.emotionoui.oui.diary.entity.DailyDiaryCollection;
import lombok.*;
import org.bson.Document;
import java.util.List;

@Builder
@Getter
@ToString
@AllArgsConstructor
public class SearchDailyDiaryRes {

    // 일기 ID
    private String dailyDiaryId;
    // 다이어리 ID
    private Integer diaryId;
    // 일기 내용
    private String dailyContent;

    public static SearchDailyDiaryRes of(DailyDiaryCollection collection) {
        return SearchDailyDiaryRes.builder()
                .dailyDiaryId(collection.getId().toString())
                .diaryId(collection.getDiaryId())
                .dailyContent(collection.getContent())
                .build();
    }
}