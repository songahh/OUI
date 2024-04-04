package com.emotionoui.oui.schedule.service;

import com.emotionoui.oui.diary.entity.Diary;
import com.emotionoui.oui.diary.repository.DiaryRepository;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.schedule.dto.req.ScheduleReq;
import com.emotionoui.oui.schedule.entity.Schedule;
import com.emotionoui.oui.schedule.exception.ScheduleNotFoundException;
import com.emotionoui.oui.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final DiaryRepository diaryRepository;

    // 회원 일정 추가
    @Transactional
    public int saveSchedules(ScheduleReq scheduleReq,
                             Member member) {

        Diary diary = diaryRepository.findById(scheduleReq.getDiaryId()).orElseThrow();

        scheduleRepository.save(scheduleReq.toEntity(
                                member, diary, scheduleReq.getTitle(), scheduleReq.getContent(),
                                scheduleReq.getDate(), scheduleReq.getColor(), scheduleReq.getType()));
        return member.getMemberId();
    }

    // 회원 일정 수정
    @Transactional
    public void updateSchedules(Integer scheduleId ,@RequestBody ScheduleReq scheduleReq) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(IllegalArgumentException::new);

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
    public void deleteSchedules(Integer scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(ScheduleNotFoundException::new);

        schedule.changeIsDelete();

        scheduleRepository.save(schedule);

    }

}