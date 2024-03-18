package com.emotionoui.oui.calendar.entity;

import com.emotionoui.oui.diary.entity.DailyDiary;
import com.emotionoui.oui.member.dto.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "EMOTION")
public class Emotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emotion_id")
    private Integer emotionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToOne
    @JoinColumn(name = "daily_diary_id")
    private DailyDiary dailyDiary;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "emotion")
    private String emotion;

    @Builder
    public Emotion(Member member, DailyDiary dailyDiary, LocalDateTime date, Emotion emotion) {
        this.emotionId = emotion.getEmotionId();
        this.member = member;
        this.dailyDiary = dailyDiary;
        this.date = date;
        this.emotion = emotion.getEmotion();
//        member.getEmotionList().add(this);
//        dailyDiary.setEmotion(this);
    }
}
