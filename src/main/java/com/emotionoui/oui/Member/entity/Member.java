package com.emotionoui.oui.Member.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
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

    @Setter
    @OneToOne(mappedBy = "member")
    private FcmInfo fcmInfo;

    private String email;
    private String img;
    private String nickname;
    private String password;

    @CreatedDate
    private LocalDateTime regdate;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @Builder
    public Member(String email, String nickname, String password, Integer isDeleted){
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.isDeleted = isDeleted;
    }
}
