package com.emotionoui.oui.alarm.repository;

import com.emotionoui.oui.alarm.entity.FcmInfo;
import com.emotionoui.oui.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FcmInfoRepository extends JpaRepository<FcmInfo, Integer> {

    FcmInfo findByMember(Member member);
}
