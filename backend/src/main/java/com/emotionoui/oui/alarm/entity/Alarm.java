package com.emotionoui.oui.alarm.entity;

import com.emotionoui.oui.member.entity.MemberAlarm;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "ALARM")
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Integer id;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private AlarmContentType type;

    private String title;
    private String content;
    private String link;

    @OneToMany(mappedBy="alarm")
    private List<MemberAlarm> memberAlarmList = new ArrayList<>();

    @Builder
    public Alarm(AlarmContentType type, String title, String content,String link) {
        this.type = type;
        this.title = title;
        this.content = content;
        this.link = link;
    }
}