package com.emotionoui.oui.member.repository;

import com.emotionoui.oui.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByEmail(String email);
}
