package com.emotionoui.oui.diary.entity;

import com.emotionoui.oui.member.entity.MemberAlarm;
import com.emotionoui.oui.member.entity.MemberDiary;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@EntityListeners({AuditingEntityListener.class})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "DIARY")
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="diary_id")
    private Integer id;

    @OneToMany(mappedBy = "diary")
    private List<DailyDiary> dailyDiaryList = new ArrayList<>();

    @OneToMany(mappedBy = "diary")
    private List<MemberDiary> memberDiaryList = new ArrayList<>();

    @OneToMany(mappedBy = "diary")
    private List<MemberAlarm> memberAlarmList = new ArrayList<>();

    @Column(name = "type")
    private Integer type;

    @Column(name = "name")
    private String name;

    @CreatedDate
    @LastModifiedDate
    @Column(name = "created_at")
    private LocalDateTime created_at;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @Builder
    public Diary(Integer type, String name, Integer isDeleted){
        this.type = type;
        this.name = name;
        this.isDeleted = isDeleted;
    }
}