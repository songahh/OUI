package com.emotionoui.oui.schedule.service;

import com.emotionoui.oui.schedule.dto.ScheduleDto;
import com.emotionoui.oui.schedule.dto.ScheduleRequest;
import com.emotionoui.oui.calendar.entity.Member;
import com.emotionoui.oui.calendar.entity.Schedule;
import com.emotionoui.oui.schedule.exception.ScheduleNotFoundException;
import com.emotionoui.oui.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final MemberRepository memberRepository;

    @Transactional
    public int writeSchedules(ScheduleRequest scheduleRequest) {
        Member member = memberRepository.findById(scheduleRequest.getMemberId()).orElseThrow(UserNotFoundException::new);
        Schedule savedScedules = scheduleRepository.save(scheduleRequest.toEntity(member));
        return savedScedules.getId();
    }

    @Transactional
    public int findByScheduleId(int memberId) {
        Schedule schedule = scheduleRepository.findByScheduleId(memberId);
        return schedule.getId();
    }

}