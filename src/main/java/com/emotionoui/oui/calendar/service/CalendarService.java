package com.emotionoui.oui.calendar.service;


import com.emotionoui.oui.calendar.dto.CalendarDto;
import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.calendar.repository.EmotionRepository;
import com.emotionoui.oui.calendar.repository.EmotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final EmotionRepository emotionRepository;

    @Transactional(readOnly = true)
    public List<CalendarDto> findByMyCalendar(Integer memberId, LocalDateTime date){

        List<Emotion> emotionList = emotionRepository.findByMyCalendar(date, memberId);
        return emotionList.stream()
                .map(CalendarDto::of)
                .collect(Collectors.toList());
    }
}
