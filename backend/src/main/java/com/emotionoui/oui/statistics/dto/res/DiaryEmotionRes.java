package com.emotionoui.oui.statistics.dto.res;

import com.emotionoui.oui.diary.dto.EmotionClass;
import com.emotionoui.oui.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Builder
@Getter
@ToString
@AllArgsConstructor
public class DiaryEmotionRes {

    private String memberName;
    //내 월 감정
    private HashMap<String,Double> myMonthEmotion;
    //친구 월 감정
    private List<DiaryMemberRes> members;

    public static DiaryEmotionRes of(Member member, Map<String, List<EmotionClass>> others){

        String my = member.getNickname();
        HashMap<String, Double> myEmotionSum = new HashMap<>();
        List<DiaryMemberRes> memberResList = new ArrayList<>();

        others.forEach((nickname, emotionList) -> {
            // other에 key String 꺼내서 EmotionList총합을 계산
            HashMap<String, Double> emotionSum = new HashMap<>();
            emotionList.forEach(emotionClass -> {
                emotionSum.merge("happy", emotionClass.getHappy(), Double::sum);
                emotionSum.merge("comfortable", emotionClass.getComfortable(), Double::sum);
                emotionSum.merge("embarrassed", emotionClass.getEmbarrassed(), Double::sum);
                emotionSum.merge("angry", emotionClass.getAngry(), Double::sum);
                emotionSum.merge("doubtful", emotionClass.getDoubtful(), Double::sum);
                emotionSum.merge("sad", emotionClass.getSad(), Double::sum);
            });
            // 꺼낸 키가 mynickname이면 myEmotionSum으로
            if (nickname.equals(my)) {
                myEmotionSum.putAll(emotionSum);
            } else {
                // 다른 사용자의 정보는 memberRes에 추가
                memberResList.add(DiaryMemberRes.builder()
                        .memberName(nickname)
                        .emotion(emotionSum)
                        .build());
            }
        });


        return DiaryEmotionRes.builder()
                .memberName(my)
                .myMonthEmotion(myEmotionSum)
                .members(memberResList)
                .build();

    }

}
