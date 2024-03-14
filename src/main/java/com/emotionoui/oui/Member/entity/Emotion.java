package com.emotionoui.oui.Member.entity;

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
    private Integer id;

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
    public Emotion(Member member, DailyDiary dailyDiary, LocalDateTime date, String emotion) {
        this.member = member;
        this.dailyDiary = dailyDiary;
        this.date = date;
        this.emotion = emotion;
        member.getEmotionList().add(this);
        dailyDiary.setEmotion(this);
    }
}
