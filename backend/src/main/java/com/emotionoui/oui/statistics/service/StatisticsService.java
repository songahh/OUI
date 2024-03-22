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

    public HashMap<Date, double[]> getMyWeek(Integer diaryId, LocalDate end){
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
        int size = temp.size();


        HashMap<Date, double[]> weeklytotalEmotion = new HashMap<>();
        HashMap<Date, Integer> countMap = new HashMap<>();

        for(int i = 0; i < size; i++) {
            Date date = mongoIdList.get(i).getDate();
            double[] currentEmotions = new double[]{temp.get(i).getHappy(), temp.get(i).getSad()};
            if (weeklytotalEmotion.containsKey(date)) {
                countMap.put(date,countMap.get(date)+1);
                double[] existingEmotions = weeklytotalEmotion.get(date);
                existingEmotions[0] += currentEmotions[0];
                existingEmotions[1] += currentEmotions[1];
            } else {
                weeklytotalEmotion.put(date, currentEmotions);
                countMap.put(date,1);
            }
        }

        weeklytotalEmotion.forEach((date, emotions) -> {
            emotions[0] *= (double) 100 /countMap.get(date);
            emotions[1] *= (double) 100 /countMap.get(date);
        });

        return weeklytotalEmotion;
    }
}
