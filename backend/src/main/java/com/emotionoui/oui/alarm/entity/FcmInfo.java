package com.emotionoui.oui.alarm.entity;

import com.emotionoui.oui.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "FCM_INFO")
public class FcmInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fcm_info_id")
    private Integer id;

    @OneToOne
    @JoinColumn(name="member_id")
    private Member member;

    private String deviceId;

    private String token;

    @Builder
    public FcmInfo(Member member, String deviceId, String token) {
        this.member = member;
        this.deviceId = deviceId;
        this.token = token;
//        member.setFcmInfo(this);
    }
}
