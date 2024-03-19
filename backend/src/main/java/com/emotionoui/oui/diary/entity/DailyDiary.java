package com.emotionoui.oui.diary.entity;


import com.emotionoui.oui.calendar.entity.Emotion;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;
import java.util.Date;

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

    @Column(name="daily_date")
    private Date dailyDate;

    @Column(name="mongo_id")
    private String mongoId;

//    @Setter
//    @OneToOne(mappedBy = "dailyDiary")
//    private Emotion emotion;
//
//    @CreatedDate
//    @LastModifiedDate
//    @Column(name = "created_at")
//    private LocalDateTime created_at;
//
//    @Column(name = "is_deleted")
//    private Integer isDeleted;

    @Builder
    public DailyDiary(Diary diary, String mongoId, Date dailyDate){
        this.diary = diary;
        this.mongoId = mongoId;
        this.dailyDate = dailyDate;
        diary.getDailyDiaryList().add(this);
    }
}