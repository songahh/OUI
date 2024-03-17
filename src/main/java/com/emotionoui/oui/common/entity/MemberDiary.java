package com.emotionoui.oui.common.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@EntityListeners({AuditingEntityListener.class})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "MEBMER_DIARY")
public class MemberDiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_diary_id")
    private Integer id;

    private String alarm;
    private Integer orders;

    @CreatedDate
    @LastModifiedDate
    private LocalDateTime create_at;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="diary_id")
    private Diary diary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    @Builder
    public MemberDiary(String alarm, Integer orders, Integer isDeleted, Diary diary, Member member){
        this.alarm = alarm;
        this.orders = orders;
        this.isDeleted = isDeleted;
        this.diary = diary;
        this.member = member;
        diary.getMemberDiaryList().add(this);
        member.getMemberDiaryList().add(this);
    }
}
