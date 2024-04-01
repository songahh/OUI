package com.emotionoui.oui.diary.service;

import com.emotionoui.oui.diary.dto.EmotionClass;
import com.emotionoui.oui.diary.dto.req.CreateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.DecorateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.UpdateDiarySettingReq;
import com.emotionoui.oui.diary.dto.res.DecorateDailyDiaryRes;
import com.emotionoui.oui.diary.dto.res.SearchDailyDiaryRes;
import com.emotionoui.oui.diary.dto.res.SearchDiarySettingRes;
import com.emotionoui.oui.member.entity.Member;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

public interface DiaryService {
    String createDailyDiary(CreateDailyDiaryReq req, Member member) throws IOException, ExecutionException, InterruptedException;
    Integer updateDailyDiary(CreateDailyDiaryReq req, Integer dailyId);
    void deleteDailyDiary(Integer dailyId);
    SearchDailyDiaryRes searchDailyDiary(Integer dailyId, Integer memberId);
    Boolean searchDailyDiaryByDate(Integer diaryId, String date, Integer memberId);
    EmotionClass searchEmotion(Integer dailyId);
    List<String> searchMusic(Integer dailyId);
    String searchComment(Integer dailyId);
    SearchDiarySettingRes searchDiarySetting(Integer diaryId, Integer memberId);
    void updateDiarySetting(UpdateDiarySettingReq req, Integer diaryId, Integer memberId);
    String decorateSaveDailyDiary(DecorateDailyDiaryReq req, Integer dailyId);
    DecorateDailyDiaryRes decorateDailyDiary(DecorateDailyDiaryReq req, Member member);
    void exitShareDiary(Integer diaryId, int memberId);

    void syncDiary(Integer memberId, Integer diaryId);
    Integer findDailyDiaryIdByMongoId(String mongoId);
}