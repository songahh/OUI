package com.emotionoui.oui.diary.service;

import com.emotionoui.oui.diary.dto.EmotionClass;
import com.emotionoui.oui.diary.dto.req.CreateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.DecorateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.UpdateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.UpdateDiarySettingReq;
import com.emotionoui.oui.diary.dto.res.SearchDailyDiaryRes;
import com.emotionoui.oui.diary.dto.res.SearchDiarySettingRes;
import com.emotionoui.oui.member.entity.Member;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

public interface DiaryService {
    String createDailyDiary(CreateDailyDiaryReq req, Member member) throws IOException, ExecutionException, InterruptedException;
    Integer updateDailyDiary(UpdateDailyDiaryReq req, Integer dailyId);
    void deleteDailyDiary(Integer dailyId);
    SearchDailyDiaryRes searchDailyDiary(Integer dailyId);
    EmotionClass searchEmotion(Integer dailyId);
    List<String> searchMusic(Integer dailyId);
    String searchComment(Integer dailyId);
    SearchDiarySettingRes searchDiarySetting(Integer diaryId, Integer memberId);
    void updateDiarySetting(UpdateDiarySettingReq req, Integer diaryId, Integer memberId);
    String decorateDailyDiary(DecorateDailyDiaryReq req, Integer dailyId);

    void exitShareDiary(Integer diaryId, int memberId);
}