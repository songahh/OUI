package com.emotionoui.oui.member.repository;

import com.emotionoui.oui.member.dto.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByEmail(String email);
}

//public interface UserRepository extends JpaRepository<User, String> {
//    Optional<User> findByUserEmailAndDeletedAtIsNull(String userEmail);
//    Optional<User> findByUserId(String userId);
//}