package com.emotionoui.oui.member.repository;

import com.emotionoui.oui.member.entity.AlarmType;
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
    AlarmType findAlarmByMemberIdAndDiaryId(Integer diaryId, Integer memberId);

    @Query("SELECT m.member FROM MemberDiary m WHERE m.diary.id = :diaryId")
    List<Member> findMemberByDiaryId(@Param("diaryId") Integer diaryId);

    @Query("SELECT m FROM MemberDiary m WHERE m.member.memberId= :newMemberId")
    MemberDiary findByMemberId(@Param("newMemberId") Integer newMemberId);

    @Query("SELECT COUNT(m.id) FROM MemberDiary m WHERE m.member.memberId = :memberId AND m.isDeleted = 0")
    Integer countByMemberId(@Param("memberId") Integer memberId);
}