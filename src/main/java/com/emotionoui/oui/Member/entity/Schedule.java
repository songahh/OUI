package com.emotionoui.oui.Member.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "SCHEDULE")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    private String title;

    private String content;

    private LocalDateTime date;

    @CreatedDate
    @LastModifiedDate
    @Column(name = "created_at")
    private LocalDateTime created_at;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @Builder
    public Schedule(Member member, String title, String content, LocalDateTime date, Integer isDeleted) {
        this.member = member;
        this.title = title;
        this.content = content;
        this.date = date;
        this.isDeleted = isDeleted;
        member.getScheduleList().add(this);
    }
}