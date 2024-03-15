package com.emotionoui.oui.calendar.entity;

import com.emotionoui.oui.Member.entity.MemberAlarm;
import com.emotionoui.oui.Member.entity.MemberDiary;
import com.emotionoui.oui.Member.entity.Preference;
import com.emotionoui.oui.schedule.entity.Schedule;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "MEMBER")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Integer id;

    @OneToMany(mappedBy = "member")
    private List<MemberAlarm> memberAlarmList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Preference> preferenceList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Schedule> scheduleList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Emotion> emotionList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberDiary> memberDiaryList = new ArrayList<>();


    private String email;
    private String img;
    private String nickname;
    private String password;

    @CreatedDate
    private LocalDateTime regdate;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @Builder
    public Member(int id,String email, String nickname, String password, Integer isDeleted){
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.isDeleted = isDeleted;
    }
}
