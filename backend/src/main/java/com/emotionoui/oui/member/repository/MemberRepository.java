package com.emotionoui.oui.member.repository;

import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByMemberIdAndIsDeleted(Integer memberId, Integer isDeleted);
}
