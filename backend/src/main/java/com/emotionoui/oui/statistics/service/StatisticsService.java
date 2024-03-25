package com.emotionoui.oui.statistics.service;

import com.emotionoui.oui.diary.dto.EmotionClass;
import com.emotionoui.oui.diary.entity.DailyDiaryCollection;
import com.emotionoui.oui.diary.repository.DailyDiaryMongoRepository;
import com.emotionoui.oui.diary.repository.DailyDiaryRepository;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.statistics.dto.WeeklyMongoDto;
import com.emotionoui.oui.statistics.dto.res.DiaryEmotionRes;
import com.emotionoui.oui.statistics.repository.StatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class StatisticsService{

    private final StatisticsRepository statisticsRepository;
    private final DailyDiaryMongoRepository dailyDiaryMongoRepository;
    private final DailyDiaryRepository dailyDiaryRepository;

    //개인 월 감정
    public HashMap<String, Double> getMyMonth(Integer diaryId, LocalDate date) {

        LocalDate startOfMonth = date.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = date.with(TemporalAdjusters.lastDayOfMonth());

        //LocalDate -> Date
        Date start = Date.from(startOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date end = Date.from(endOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());

        List<WeeklyMongoDto> mongoIdList = dailyDiaryRepository.getMongoIdByDiaryId(diaryId,start,end);

        List<EmotionClass> temp = mongoIdList.stream()
                .map(e -> dailyDiaryMongoRepository.findEmotionByDailyId(e.getMongoId()).getEmotion())
                .toList();

        return calculate(temp);
    }

    //개인 주 감정
    public HashMap<Date, double[]> getMyWeek(Integer diaryId, LocalDate end){
        LocalDate start = end.minusDays(6);

        Date startDate = Date.from(start.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(end.atStartOfDay(ZoneId.systemDefault()).toInstant());
        //일주일치 일기 몽고 id
        List<WeeklyMongoDto> mongoIdList = dailyDiaryRepository.getMongoIdByDiaryId(diaryId,startDate,endDate);
        mongoIdList.sort(WeeklyMongoDto::compareTo);


        //몽고id로 감정들 가져오기
        List<EmotionClass> temp = mongoIdList.stream()
                .map(e -> dailyDiaryMongoRepository.findEmotionByDailyId(e.getMongoId()).getEmotion())
                .toList();
        int size = temp.size();


        HashMap<Date, double[]> weeklytotalEmotion = new HashMap<>();
        HashMap<Date, Integer> countMap = new HashMap<>();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);

        while (!calendar.getTime().after(endDate)) {
            Date currentDate = calendar.getTime();

            weeklytotalEmotion.putIfAbsent(currentDate, new double[]{0.0,0.0});
            countMap.putIfAbsent(currentDate, 0);
            calendar.add(Calendar.DATE, 1);
        }

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

        weeklytotalEmotion.forEach((key,value)->{
            System.out.println(key + ":" + Arrays.toString(value));
        });

        //일별 평균 계산
        weeklytotalEmotion.forEach((date, emotions) -> {
            if(countMap.get(date) > 0){
                emotions[0] *= (double) 100 /countMap.get(date);
                emotions[1] *= (double) 100 /countMap.get(date);
            }
        });

        return weeklytotalEmotion;
    }

    //다이어리 월 감정
    public DiaryEmotionRes getDiaryEmotion(Member member, Integer diaryId, LocalDate date){

        LocalDate startOfMonth = date.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = date.with(TemporalAdjusters.lastDayOfMonth());

        //LocalDate -> Date
        Date start = Date.from(startOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date end = Date.from(endOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());

        List<WeeklyMongoDto> mongoIdList = dailyDiaryRepository.getMongoIdByDiaryId(diaryId,start,end);

        // 작성자id와 해당 월 감정list
        Map<String, List<EmotionClass>> temp = mongoIdList.stream()
                .map(e -> dailyDiaryMongoRepository.findEmotionByDailyId(e.getMongoId())) // 각 ID에 대한 Emotion 정보 조회
                .collect(Collectors.toMap(
                        DailyDiaryCollection::getNickname,
                        e -> {
                            List<EmotionClass> list = new ArrayList<>();
                            list.add(e.getEmotion()); // 초기 값으로 EmotionClass 인스턴스의 리스트 생성
                            return list;
                        },
                        (existingList, newList) -> { // 같은 키에 대한 값이 이미 존재할 경우, 리스트를 병합
                            existingList.addAll(newList);
                            return existingList;
                        }
                ));

        return DiaryEmotionRes.of(member,temp);

    }

    public static HashMap<String, Double> calculate(List<EmotionClass> emotions) {
        HashMap<String, Double> emotionSums = new HashMap<>();

        // 초기값 설정
        emotionSums.put("happy", 0.0);
        emotionSums.put("comfortable", 0.0);
        emotionSums.put("embarrassed", 0.0);
        emotionSums.put("angry", 0.0);
        emotionSums.put("doubtful", 0.0);
        emotionSums.put("sad", 0.0);

        for (EmotionClass emotion : emotions) {
            emotionSums.put("happy", emotionSums.get("happy") + emotion.getHappy());
            emotionSums.put("comfortable", emotionSums.get("comfortable") + emotion.getComfortable());
            emotionSums.put("embarrassed", emotionSums.get("embarrassed") + emotion.getEmbarrassed());
            emotionSums.put("angry", emotionSums.get("angry") + emotion.getAngry());
            emotionSums.put("doubtful", emotionSums.get("doubtful") + emotion.getDoubtful());
            emotionSums.put("sad", emotionSums.get("sad") + emotion.getSad());
        }

        return emotionSums;
    }
}
