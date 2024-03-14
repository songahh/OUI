package com.emotionoui.oui.Member.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "diary")
public class DailyDiaryCollection {

    @Id
    private String id;
    // 다이어리 ID
    private long diaryId;
    // 일기 텍스트
    private String text;
    // 일기 텍스트 상자 위치 (왼쪽 위 좌표, 오른쪽 아래 좌표 -> 총 4개)
    private List<Integer> textLocation;
    // 사진
    private List<org.bson.Document> images;
    // 사진 위치
    private List<List<Integer>> imagesLocation;
    // 손글씨
    private List<org.bson.Document> handWritings;
    // 손글씨 위치
    private List<List<Integer>> handWritingsLocation;
}