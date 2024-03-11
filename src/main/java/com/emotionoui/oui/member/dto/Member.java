package com.emotionoui.oui.member.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="member")
public class Member {
    @Id
    @Column(name="member_id")
    private int memberId;

    @Column(name="member_email")
    private String memberEmail;

    @Column(name="member_nickname")
    private String memberNickname;

    @Column(name="member_password")
    private String memberPassword;

    @Column(name="member_img")
    private String memberImg;

    @Column(name="regdate")
    private LocalDateTime regdate;
    
    @Column(name="is_deleted")
    private int isDeleted;


}
