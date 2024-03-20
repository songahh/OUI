package com.emotionoui.oui.statistics.service;

import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.statistics.repository.StatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class StatisticsService{

    private final StatisticsRepository statisticsRepository;

    public HashMap<String,Integer> getMyMonth(Integer diaryId,int year,int month) {

        List<String> emotions = statisticsRepository.getMyMonth(diaryId, year, month)
                .stream()
                .map(Emotion::getEmotion)
                .toList();

        HashMap<String,Integer> map = new HashMap<>();
        for(String emotion:emotions){
            map.put(emotion, map.getOrDefault(emotion, 0) + 1);
        }

        return map;
    }
}
