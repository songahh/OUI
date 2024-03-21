package com.emotionoui.oui.main.repository;

import com.emotionoui.oui.member.entity.MemberDiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MainRepository extends JpaRepository<MemberDiary, Integer> {
    // memberId로 해당 멤버 찾아오기
    List<MemberDiary>find(Integer memberId);
}
