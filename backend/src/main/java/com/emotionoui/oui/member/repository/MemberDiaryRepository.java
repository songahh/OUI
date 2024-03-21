package com.emotionoui.oui.member.repository;

import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.entity.MemberDiary;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberDiaryRepository extends JpaRepository<MemberDiary, Integer> {

    @Query("SELECT m.alarm FROM MemberDiary m WHERE m.diary.id = :diaryId AND m.member.memberId = :memberId")
    String findAlarmByMemberIdAndDiaryId(Integer diaryId, Integer memberId);

    @Query("SELECT m.member FROM MemberDiary m WHERE m.diary.id = :diaryId")
    List<Member> findMemberByDiaryId(@Param("diaryId") Integer diaryId);
}
