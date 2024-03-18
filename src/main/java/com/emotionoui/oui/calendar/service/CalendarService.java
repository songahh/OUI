package com.emotionoui.oui.calendar.service;


import com.emotionoui.oui.calendar.dto.res.MyCalendarRes;
import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.calendar.repository.EmotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final EmotionRepository emotionRepository;

    @Transactional(readOnly = true)
    public List<MyCalendarRes> findByMyCalendar(Integer memberId, Integer year, Integer month){

        List<Emotion> emotionList = emotionRepository.findByMyCalendar(year, month, memberId);
        return emotionList.stream()
                .map(MyCalendarRes::of)
                .collect(Collectors.toList());
    }
}
