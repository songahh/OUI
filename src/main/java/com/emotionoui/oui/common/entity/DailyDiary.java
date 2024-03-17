package com.emotionoui.oui.common.entity;


import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.common.entity.Diary;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Entity
@Getter
@EntityListeners({AuditingEntityListener.class})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "DAILY_DIARY")
public class DailyDiary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="daily_diary_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="diary_id")
    private Diary diary;

    @Column(name="mongo_id")
    private String mongoId;

    @Setter
    @OneToOne(mappedBy = "dailyDiary")
    private Emotion emotion;

    @Builder
    public DailyDiary(Diary diary, String mongoId){
        this.diary = diary;
        this.mongoId = mongoId;
    }
}