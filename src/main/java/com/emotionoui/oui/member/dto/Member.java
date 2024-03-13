package com.emotionoui.oui.member.dto;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="member")
public class Member implements UserDetails {

    @Id
    @Column(name="member_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int memberId;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="nickname")
    private String nickname;

    @Column(name="password")
    private String password;

    @Column(name="img")
    private String img;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="regdate", nullable = false)
    private LocalDateTime regdate;
    
    @Column(name="is_deleted", nullable = false)
    private int isDeleted;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isDeleted == 0;
    }

    public Member(String email, String nickname, LocalDateTime regdate) {
        this.email = email;
        this.nickname = nickname;
        this.regdate = regdate;
    }
}
