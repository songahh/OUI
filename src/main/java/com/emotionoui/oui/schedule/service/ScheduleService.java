package com.emotionoui.oui.schedule.service;

import com.emotionoui.oui.schedule.dto.ScheduleReq;
import com.emotionoui.oui.calendar.entity.Member;
import com.emotionoui.oui.schedule.entity.Schedule;
import com.emotionoui.oui.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

//    private final MemberRepository memberRepository;

    @Transactional
    public int saveSchedules(@RequestBody ScheduleReq scheduleReq) {
//        Member member = memberRepository.findById(scheduleRequest.getMemberId()).orElseThrow(UserNotFoundException::new);
            Member member = Member.builder().id(1).build();
        scheduleRepository.save(scheduleReq.toEntity(member,scheduleReq.getTitle(),scheduleReq.getContent(), scheduleReq.getDate()));
        return member.getId();
    }

    @Transactional
    public int findByScheduleId(int memberId) {
        Schedule schedule = scheduleRepository.findScheduleByMemberId(memberId);
        return schedule.getId();
    }

}