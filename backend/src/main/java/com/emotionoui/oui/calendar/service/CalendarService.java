package com.emotionoui.oui.calendar.service;


import com.emotionoui.oui.calendar.dto.res.CalendarScheduleDto;
import com.emotionoui.oui.calendar.dto.res.CalendarDiaryDto;
import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.calendar.repository.CalendarRepository;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.repository.MemberDiaryRepository;
import com.emotionoui.oui.schedule.entity.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final MemberDiaryRepository memberDiaryRepository;

    // 캘린더에서 한달간 내 일기와 일정 조회
    @Transactional(readOnly = true)
    public List<CalendarDiaryDto> findCalendarbyDate(Integer memberId, Integer year, Integer month){


        List<Emotion> emotionList = calendarRepository.findMyDiarybyDate(memberId, year, month+1);

        return emotionList.stream()
                .map(CalendarDiaryDto::of)
                .collect(Collectors.toList());
    }

    // 공유일기에서 한달간 모든 인원의 일기와 일정 조회
    @Transactional(readOnly = true)
    public List<CalendarScheduleDto> findMySchedulebyDate(Integer memberId, Integer year, Integer month){


        List<Schedule> scheduleList = calendarRepository.findMySchedulebyDate(memberId, year, month+1);

        return scheduleList.stream()
                .map(CalendarScheduleDto::of)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Member> findMemberByDiaryId(Integer diaryId){

        List<Member> memberList = memberDiaryRepository.findMemberByDiaryId(diaryId);

        return memberList;
    }


}
