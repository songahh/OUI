package com.emotionoui.oui.member.entity;

import com.emotionoui.oui.alarm.entity.Alarm;
import com.emotionoui.oui.diary.entity.Diary;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "MEMBER_ALARM")
public class MemberAlarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_alarm_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alarm_id", nullable = false)
    private Alarm alarm;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id", nullable = false)
    private Diary diary;

    @CreatedDate
    @LastModifiedDate
    @Column(name = "created_at")
    private LocalDateTime created_at;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @Builder
    public MemberAlarm(Alarm alarm, Member member, Diary diary, Integer isDeleted) {
        this.alarm = alarm;
        this.member = member;
        this.diary = diary;
        this.isDeleted = isDeleted;
        alarm.getMemberAlarmList().add(this);
//        member.getMemberAlarmList().add(this);
        diary.getMemberAlarmList().add(this);
    }
}