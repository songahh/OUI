package com.emotionoui.oui.schedule.entity;

import com.emotionoui.oui.member.entity.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "SCHEDULE")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Integer scheduleId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    private String title;

    private String content;

    private Date date;

    private String color;


    @CreatedDate
    @LastModifiedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;


    @Column(name = "is_deleted")
    private Integer isDeleted;

    public void changeTitle(String title){
        this.title = title;
    }

    public void changeContent(String content){
        this.content = content;
    }

    public void changeIsDelete(){
        this.isDeleted = 1;
    }

    @Builder
    public Schedule(Integer scheduleId, Member member, String title, String content, Date date, String color, Integer isDeleted, LocalDateTime createdAt) {
        this.scheduleId = scheduleId;
        this.member = member;
        this.title = title;
        this.content = content;
        this.date = date;
        this.color = color;
        this.createdAt = createdAt;
        this.isDeleted = isDeleted;

    }
}