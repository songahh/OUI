package com.emotionoui.oui.member.repository;

import com.emotionoui.oui.member.entity.MemberAlarm;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberAlarmRepository extends JpaRepository<MemberAlarm, Integer> {

    @Query("SELECT m FROM MemberAlarm m WHERE m.member.memberId = :memberId")
    List<MemberAlarm> findByMemberId(@Param("memberId") Integer memberId);

}
