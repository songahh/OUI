package com.emotionoui.oui.diary.entity;

import com.emotionoui.oui.diary.dto.EmotionClass;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "DAILY_DIARY")
public class DailyDiaryCollection {

    @Id
    private ObjectId id;

    // 다이어리 ID
    private Integer diaryId;

    // 일기 내용
    private String content;

    // 코멘트 내용
    private String comment;

    private Integer isDeleted;

    private EmotionClass emotion;

    private List<String> music;

    @Builder
    public DailyDiaryCollection(String id, Integer diaryId, String content, Integer isDeleted){
//        this.id = new ObjectId(id);
        this.diaryId = diaryId;
        this.content = content;
        this.isDeleted = isDeleted;
    }
}