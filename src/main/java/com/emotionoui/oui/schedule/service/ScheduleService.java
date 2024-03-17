package com.emotionoui.oui.schedule.service;

import com.emotionoui.oui.schedule.dto.req.ScheduleReq;
import com.emotionoui.oui.common.entity.Member;
import com.emotionoui.oui.schedule.entity.Schedule;
import com.emotionoui.oui.schedule.exception.ScheduleNotFoundException;
import com.emotionoui.oui.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

//    private final MemberRepository memberRepository;


    // 회원 일정 추가
    @Transactional
    public int saveSchedules(@RequestBody ScheduleReq scheduleReq) {
//        Member member = memberRepository.findById(scheduleRequest.getMemberId()).orElseThrow(UserNotFoundException::new);
            Member member = Member.builder().id(1).build();
        scheduleRepository.save(scheduleReq.toEntity(
                                member, scheduleReq.getTitle(), scheduleReq.getContent(),
                                scheduleReq.getDate()));
        return member.getId();
    }

    // 회원 일정 수정
    @Transactional
    public void updateSchedules(Integer scheduleId ,@RequestBody ScheduleReq scheduleReq) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(ScheduleNotFoundException::new);

//        scheduleRepository.deleteByScheduleId(scheduleId);
//        scheduleRepository.flush();

        if(scheduleReq.getTitle() !=null){
            schedule.changeTitle(scheduleReq.getTitle());
        }

        if(scheduleReq.getContent() !=null){
            schedule.changeContent(scheduleReq.getContent());
        }

        scheduleRepository.save(schedule);

    }

    // 일정 삭제 - isDelete 수정
    @Transactional
    public void deleteSchedules(Integer scheduleId ,@RequestBody ScheduleReq scheduleReq) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(ScheduleNotFoundException::new);

//        scheduleRepository.deleteByScheduleId(scheduleId);
//        scheduleRepository.flush();

        schedule.changeIsDelete();

        scheduleRepository.save(schedule);

    }

}