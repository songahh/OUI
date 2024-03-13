package com.emotionoui.oui.calendar.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "PREFERENCE")
public class Preference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preference_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    private String type;

    @CreatedDate
    @LastModifiedDate
    @Column(name = "created_at")
    private LocalDateTime created_at;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @Builder
    public Preference(Member member, String type, Integer isDeleted) {
        this.member = member;
        this.type = type;
        this.isDeleted = isDeleted;
        member.getPreferenceList().add(this);
    }
}