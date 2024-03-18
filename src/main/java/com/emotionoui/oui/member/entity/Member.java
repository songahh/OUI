package com.emotionoui.oui.member.entity;

import com.emotionoui.oui.alarm.entity.FcmInfo;
import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.schedule.entity.Schedule;
import com.emotionoui.oui.survey.entity.Preference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "MEMBER")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    public Member(Integer id, String email, String nickname, String password, Integer isDeleted){
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.isDeleted = isDeleted;
    }
}
