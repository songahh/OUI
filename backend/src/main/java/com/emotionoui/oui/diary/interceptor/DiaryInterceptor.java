package com.emotionoui.oui.diary.interceptor;

import org.springframework.messaging.support.ChannelInterceptor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DiaryInterceptor implements ChannelInterceptor {

    // dailyDiary 별로 세션 저장
    List<HashMap<String, Object>> sessions = new ArrayList<>();
    static int dailyDiaryIndex = -1;

    // private final RedisService redisService;

}
