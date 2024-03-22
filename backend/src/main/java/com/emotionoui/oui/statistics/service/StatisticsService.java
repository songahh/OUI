package com.emotionoui.oui.statistics.service;

import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.diary.dto.EmotionClass;
import com.emotionoui.oui.diary.repository.DailyDiaryMongoRepository;
import com.emotionoui.oui.diary.repository.DailyDiaryRepository;
import com.emotionoui.oui.statistics.dto.WeeklyMongoDto;
import com.emotionoui.oui.statistics.repository.StatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class StatisticsService{

    private final StatisticsRepository statisticsRepository;
    private final DailyDiaryMongoRepository dailyDiaryMongoRepository;
    private final DailyDiaryRepository dailyDiaryRepository;


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

    public void getMyWeek(Integer diaryId, LocalDate end){
        LocalDate start = end.minusDays(6);

        Date startDate = Date.from(start.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(end.atStartOfDay(ZoneId.systemDefault()).toInstant());
        System.out.println(" endDate = " +  endDate);
        //일주일치 일기 몽고 id
        List<WeeklyMongoDto> mongoIdList = dailyDiaryRepository.getMyWeek(diaryId,startDate,endDate);
        mongoIdList.sort(WeeklyMongoDto::compareTo);

        //몽고id로 감정들 가져오기
        List<EmotionClass> temp = mongoIdList.stream()
                .map(e -> dailyDiaryMongoRepository.findEmotionByDailyId(e.getMongoId()).getEmotion())
                .toList();
        for(EmotionClass t:temp){
            System.out.println("t.toString() = " + t.toString());
        }
        
        // 감정이 db에 어떻게 저장되는지 확인해야 함
        // 주간 우울 행복 그래프 api를 분류해야하는지

        return ;
    }
}
