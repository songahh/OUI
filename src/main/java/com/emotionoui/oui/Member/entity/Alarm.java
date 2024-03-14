package com.emotionoui.oui.Member.entity;

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

    private String type;

    private String message;

    @OneToMany(mappedBy="alarm")
    private List<MemberAlarm> memberAlarmList = new ArrayList<>();

    @Builder
    public Alarm(String type, String message) {
        this.type = type;
        this.message = message;
    }
}